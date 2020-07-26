package main

import server "calculator/app"

func main() {
	server := &server.App{}
	server.Initialize()
	server.Run(":8000")
}
