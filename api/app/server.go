package server

import (
	"log"
	"net/http"

	"calculator/app/handler"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

//App struct
type App struct {
	Router *mux.Router
}

//Initialize server in specified port
func (app *App) Initialize(host string) {
	app.Router = mux.NewRouter().StrictSlash(true)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
		AllowedHeaders: []string{"Accept", "content-type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
	})

	api := app.Router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/", handler.GetDataForMonth).Methods("GET")
	api.HandleFunc("/", handler.AddDataForMonth).Methods("POST")
	api.HandleFunc("/", handler.DeleteDataForMonth).Methods("PATCH")

	log.Fatal(http.ListenAndServe(":8080", c.Handler(api)))
}