package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// FullDate has data for different months
type FullDate struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Date     string             `json:"date,omitempty" bson:"date,omitempty"`
	DaysData []MonthData        `json:"daysData" bson:"daysData"`
}

// MonthData has data for current month
type MonthData struct {
	Day   string `json:"day,omitempty" bson:"day,omitempty"`
	Color string `json:"color,omitempty" bson:"color,omitempty"`
}

type dateFromFront struct {
	Date string `json:"date,omitempty" bson:"date,omiteempty"`
}

type monthDataRequest struct {
	dateFromFront
	MonthData
}

var collection *mongo.Collection

func main() {
	//MONGODB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()
	fmt.Println("DBconnected")
	collection = client.Database("calendar_app").Collection("month/year")

	//ROUTER
	router := mux.NewRouter().StrictSlash(true)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"},
		AllowedHeaders: []string{"Accept", "content-type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
	})

	router.HandleFunc("/", getDataForMonth).Methods("POST")
	router.HandleFunc("/new", postDataForMonth).Methods("POST")
	router.HandleFunc("/", patchDataForMonth).Methods("PATCH")

	log.Fatal(http.ListenAndServe(":8080", c.Handler(router)))
}

func getDataForMonth(w http.ResponseWriter, r *http.Request) {
	req := dateFromFront{}
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	err := decoder.Decode(&req)
	if err != nil {
		fmt.Println("Error Parsin Request Body")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	ctx, errContext := context.WithTimeout(context.Background(), 10*time.Second)
	defer errContext()

	var foundData FullDate
	errFind := collection.FindOne(ctx, bson.M{"date": req.Date}).Decode(&foundData)
	if errFind != nil {
		fmt.Println("Data for selected month not found")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(foundData)
}

func postDataForMonth(w http.ResponseWriter, r *http.Request) {
	req := monthDataRequest{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&req)
	if err != nil {
		fmt.Println("Error Parsin Request Body")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	ctx, error := context.WithTimeout(context.Background(), 10*time.Second)
	defer error()

	var updatedData MonthData
	filter := bson.M{"date": req.Date}
	update := bson.M{"$push": bson.M{"daysData": bson.M{"day": req.Day, "color": req.Color}}}
	singleResult := collection.FindOneAndUpdate(ctx, filter, update).Decode(&updatedData)
	if singleResult != nil {
		fmt.Println("Could Not Add Data For Selected Month")
		w.WriteHeader(http.StatusBadRequest) //app is killed with Fatal // log.Fatal(errFind)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func patchDataForMonth(w http.ResponseWriter, r *http.Request) {
	req := monthDataRequest{}
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	err := decoder.Decode(&req)
	if err != nil {
		fmt.Println("Error While Parsing Request Body")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	ctx, error := context.WithTimeout(context.Background(), 10*time.Second)
	defer error()

	var updatedData interface{}
	singleResult := collection.FindOneAndUpdate(ctx, bson.M{"date": req.Date}, bson.M{"$pull": bson.M{"daysData": bson.M{"day": req.Day, "color": req.Color}}}).Decode(&updatedData)
	if singleResult != nil {
		fmt.Println("Could Not Delete Data For Selected Month")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}
