package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())

	e.GET("/", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})
	e.GET("/versions", Versions)
	e.POST("/apply", Apply)

	e.Logger.Fatal(e.Start(":8080"))
}
