package handler

import (
	"encoding/json"
	"net/http"
)

//GetDataForMonth sends all flagged days for selected month
func GetDataForMonth(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("OK")
}

//AddDataForMonth sends new selected day
func AddDataForMonth(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("OK")
}

//DeleteDataForMonth deletes selected day
func DeleteDataForMonth(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("OK")
}
