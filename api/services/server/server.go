package server

import (
	"dndApi/api/calendar"
	"dndApi/api/character"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"log"
	"net/http"
)

type Server struct {
	Router    *mux.Router
	SubRouter *mux.Router
}

func (server *Server) Init() {
	server.Router = mux.NewRouter().StrictSlash(true)
	server.SubRouter = server.Router.PathPrefix("/api").Subrouter()

	character.InitializeRoutes(server.SubRouter)
	calendar.InitializeRoutes(server.SubRouter)
}

func (server *Server) Run() {
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"},
		AllowedHeaders: []string{"Accept", "content-type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
	})

	log.Fatal(http.ListenAndServe(":8080", c.Handler(server.Router)))
}
