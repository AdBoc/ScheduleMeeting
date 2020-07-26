package handler

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

//GetDataForMonth sends all flagged days for selected month
func GetDataForMonth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	dat, err := ioutil.ReadFile("data/07.2020.txt")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest) // json.NewEncoder(w).Encode("Wrong filename")
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(dat)
}

//AddDataForMonth sends new selected day
func AddDataForMonth(w http.ResponseWriter, r *http.Request) {
	//check if file exists from received date (ex. 06/2020)
	//if it exists add received data to txt file
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("OK")
}

//DeleteDataForMonth deletes selected day
func DeleteDataForMonth(w http.ResponseWriter, r *http.Request) {
	//check if file exists from received date (ex. 06/2020)
	//delete this one field
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("OK")
}

//middleware ktory sprawdza czy plik istnieje i go tworzy/usuwa
