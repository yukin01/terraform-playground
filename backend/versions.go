package main

import (
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"

	"github.com/labstack/echo/v4"
)

var path = filepath.Join(os.Getenv("HOME"), ".tfenv", "versions")

func Versions(c echo.Context) error {
	files, err := ioutil.ReadDir(path)
	if err != nil {
		return err
	}

	versions := []string{}
	for _, f := range files {
		versions = append(versions, f.Name())
	}

	return c.JSON(http.StatusOK, versions)
}
