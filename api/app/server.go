package server

import (
	"github.com/gorilla/mux"
)

//App methods realted to router
type App struct {
	Router *mux.Router
}

//Initialize router
func (app *App) Initialize() {
	app.Router = mux.NewRouter()
}
