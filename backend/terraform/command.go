package terraform

import (
	"bytes"
	"os/exec"
)

func Init(out *bytes.Buffer) error {
	out.WriteString("❯ terraform init -backend=false -no-color\n")
	cmd := exec.Command("terraform", "init", "-backend=false", "-no-color")
	cmd.Stdout = out
	cmd.Stderr = out
	return cmd.Run()
}

func Plan(out *bytes.Buffer) error {
	out.WriteString("❯ terraform plan -no-color\n\n")
	cmd := exec.Command("terraform", "plan", "-no-color")
	cmd.Stdout = out
	cmd.Stderr = out
	return cmd.Run()
}

func Apply(out *bytes.Buffer) error {
	out.WriteString("❯ terraform apply -auto-approve -no-color\n")
	cmd := exec.Command("terraform", "apply", "-auto-approve", "-no-color")
	cmd.Stdout = out
	cmd.Stderr = out
	return cmd.Run()
}
