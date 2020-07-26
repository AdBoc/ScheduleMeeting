package server

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

//App methods realted to router
type App struct {
	Router *mux.Router
}

//Initialize router
func (app *App) Initialize() {
	app.Router = mux.NewRouter().StrictSlash(true)
}

//Run server
func (app *App) Run(host string) {
	log.Fatal(http.ListenAndServe(host, app.Router))
}
