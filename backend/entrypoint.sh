#!/bin/bash
set -eux

[ -d "$HOME/.tfenv" ] || git clone https://github.com/tfutils/tfenv.git $HOME/.tfenv
export PATH="$HOME/.tfenv/bin:$PATH"

tfenv list-remote > /tmp/remote_versions
minors="0\.12 0\.13 0\.14"

for minor in $minors ; do
  version=$(cat /tmp/remote_versions | grep -E "$minor\.[0-9]+" | sort -V | tail -n 1)
  tfenv install $version
done

tfenv install latest
tfenv use latest

exec "$@"
