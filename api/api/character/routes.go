package character

import "github.com/gorilla/mux"

func InitializeRoutes(api *mux.Router) {
	api.HandleFunc("/character", receiveCharacter).Methods("PATCH")
	api.HandleFunc("/character", sendCharacter).Methods("POST")
	api.HandleFunc("/delete", deleteCharacter).Methods("DELETE")
}
