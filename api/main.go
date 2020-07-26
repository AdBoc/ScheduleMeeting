package main

import server "calculator/app"

func main() {
	s := server.App{}
	s.Initialize(":8080")
}
