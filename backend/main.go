package main

import (
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/versions", Versions)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
