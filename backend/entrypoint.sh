#!/bin/bash
set -eux

export PATH="$HOME/.tfenv/bin:$PATH"

exec "$@"
