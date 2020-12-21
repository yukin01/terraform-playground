package main

import (
	"io/ioutil"
	"os"
	"path/filepath"
)

type File struct {
	Name    string `json:"name"`
	Content string `json:"content"`
}

type Workspace struct {
	Version string `json:"version"`
	Files   []File `json:"files"`
}

func (ws *Workspace) WriteFiles() error {
	wd, err := os.Getwd()
	if err != nil {
		return err
	}

	for _, file := range ws.Files {
		if err = ioutil.WriteFile(filepath.Join(wd, file.Name), []byte(file.Content), 0644); err != nil {
			return err
		}
	}

	return ioutil.WriteFile(filepath.Join(wd, ".terraform-version"), []byte(ws.Version), 0644)
}
