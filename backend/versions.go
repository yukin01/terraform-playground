package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
)

var path = filepath.Join(os.Getenv("HOME"), ".tfenv", "versions")

func Versions(w http.ResponseWriter, r *http.Request) {
	files, err := ioutil.ReadDir(path)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	versions := []string{}
	for _, f := range files {
		versions = append(versions, f.Name())
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)

  if err = json.NewEncoder(w).Encode(versions); err != nil {
		fmt.Println(err)
	}
}
