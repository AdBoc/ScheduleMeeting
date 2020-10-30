package main

import (
	"dndApi/services/mongo"
	"dndApi/services/server"
)

var (
	s  = server.Server{} // &server.Server{}
	db = mongo.Db{}
)

func main() {
	db.Init()
	defer db.Close()
	s.Init()
	s.Run()
}
