package calendar

import (
	"github.com/gorilla/mux"
)

func InitializeRoutes(api *mux.Router) {
	api.HandleFunc("/", sendMonthData).Methods("POST")
	api.HandleFunc("/new", modifyMonth).Methods("POST")
	api.HandleFunc("/selectAll", selectAllInMonth).Methods("POST")
	api.HandleFunc("/unselectAll", unselectAllInMonth).Methods("POST")
}
