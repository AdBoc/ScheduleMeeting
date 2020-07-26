package main

import server "calculator/app"

func main() {
	ser := server.App{}
	ser.Initialize()
	ser.Run(":8080")
}
