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
		AllowedMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
		AllowedHeaders: []string{"Accept", "content-type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
	})

	router.HandleFunc("/", getDataForMonth).Methods("POST")
	router.HandleFunc("/new", postDataForMonth).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", c.Handler(router)))
}

//get data for current month
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
		fmt.Println("Not Found")
		w.WriteHeader(http.StatusBadRequest) //app is killed with Fatal // log.Fatal(errFind)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(foundData) //jak zwrocic tylko czesc calego obieku??
}

//receive object {"day": "1", "color": "--blue"} and add it to db
func postDataForMonth(w http.ResponseWriter, r *http.Request) {
	//check if exists
	//if exists delete it
	//if doesnt then push
	req := monthDataRequest{}
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	err := decoder.Decode(&req)
	if err != nil {
		fmt.Println("Error Parsin Request Body")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	ctx, error := context.WithTimeout(context.Background(), 10*time.Second)
	defer error()

	var foundData FullDate
	errFind := collection.FindOne(ctx, bson.M{"date": req.Date, "daysData": bson.M{"$elemMatch": bson.M{"day": req.Day, "color": req.Color}}}).Decode(&foundData)
	// var res
	if errFind != nil {
		fmt.Println("Add new one")
		// collection.FindOneAndUpdate(ctx, )
	} else {
		fmt.Println("Delete")
		// collection.DeleteOne(ctx,)
	}
	
	w.WriteHeader(http.StatusOK) // fmt.Println(foundData.DaysData)
}

// req := monthDataRequest{}
// decoder := json.NewDecoder(r.Body)
// err := decoder.Decode(&req)
// if err != nil {
// 	fmt.Println("Error Parsin Request Body")
// 	w.WriteHeader(http.StatusBadRequest)
// 	return
// }
// defer r.Body.Close()

// ctx, error := context.WithTimeout(context.Background(), 10*time.Second)
// defer error()

// var foundData MonthData
// filter := bson.M{"date": req.Date}
// update := bson.M{"$push": bson.M{"daysData": bson.M{"day": req.Day, "color": req.Color}}}
// singleResult := collection.FindOneAndUpdate(ctx, filter, update).Decode(&foundData)
// if singleResult != nil {
// 	fmt.Println(singleResult)
// 	w.WriteHeader(http.StatusBadRequest) //app is killed with Fatal // log.Fatal(errFind)
// 	return
// }

// w.WriteHeader(http.StatusOK)

//QUERY Z WYSZUKIWANIEM OBIEKTU Z DANA DATA db.getCollection('month/year').find({"date": "7/2020"})
//POPRAWNE QUERY db.getCollection('month/year').find({"date": "7/2020"}, {daysData: {$elemMatch: {day : "1"}}})
/////////db.getCollection('month/year').find({"date": "7/2020"}, {daysData: {$elemMatch: {day : "1"}}})
// errFind := collection.FindOne(ctx, bson.M{"date": req.Date, "daysData": bson.M{"day": req.Day, "color": req.Color}}).Decode(&foundData) //ONLY SOMETIMES WORKS
