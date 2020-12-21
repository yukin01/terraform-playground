package main

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"

	"github.com/yukin01/terraform-playground/backend/terraform"
)

func Apply(c echo.Context) (err error) {
	ws := &Workspace{}
	if err = c.Bind(ws); err != nil {
		return err
	}

	tempDir, err := ioutil.TempDir("/tmp", "terraform-playground")
	if err != nil {
		return err
	}
	defer func() {
		err = os.RemoveAll(tempDir)
	}()

	out := new(bytes.Buffer)

	command := func() error {
		if err = ws.WriteFiles(); err != nil {
			return err
		}

		if err = terraform.Init(out); err != nil {
			return err
		}

		out.WriteString("\n\n")

		// return terraform.Apply(out)
		return terraform.Plan(out)
	}

	if err := Execute(tempDir, command); err != nil {
		return err
	}

	return c.Stream(http.StatusOK, "text/plain", out)
}

func Execute(tempDir string, process func() error) (err error) {
	wd, err := os.Getwd()
	if err != nil {
		return err
	}

	defer func() {
		err = os.Chdir(wd)
	}()

	err = os.Chdir(tempDir)
	if err != nil {
		return err
	}

	return process()
}
