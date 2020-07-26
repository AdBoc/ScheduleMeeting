package server

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"calculator/app/handler"
)

//App struct
type App struct {
	Router *mux.Router
}

//Initialize router
func (app *App) Initialize() {
	app.Router = mux.NewRouter().StrictSlash(true)
	api := app.Router.PathPrefix("/api").Subrouter()

	api.HandleFunc("/", handler.GetDataForMonth).Methods("GET")
	api.HandleFunc("/", handler.AddDataForMonth).Methods("POST")
	api.HandleFunc("/", handler.DeleteDataForMonth).Methods("PATCH")
}

//Run server on specified port
func (app *App) Run(host string) {
	log.Fatal(http.ListenAndServe(host, app.Router))
}
