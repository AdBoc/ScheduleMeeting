package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/robfig/cron/v3"
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

type CharacterData struct {
	Character string `json:"character,omitempty" bson:"character,omitempty"`
}

// MonthData has data for current month
type MonthData struct {
	Day  string `json:"day,omitempty" bson:"day,omitempty"`
	Name string `json:"name,omitempty" bson:"name,omitempty"`
}

type dateFromFront struct {
	Date string `json:"date,omitempty" bson:"date,omitempty"`
}

type monthDataRequest struct {
	dateFromFront
	MonthData
}

type player struct {
	User string `json:"user,omitempty" bson:"user,omitempty"`
}

type userDate struct {
	dateFromFront
	Name string `json:"name,omitempty" bson:"name,omitempty"`
}

var collection *mongo.Collection
var collectionCharacter *mongo.Collection

func main() {
	//Run CRON schedule
	cSchedule := cron.New()
	cSchedule.AddFunc("@monthly", func() {
		deleteOldData()
	})
	cSchedule.Start()

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
	collectionCharacter = client.Database("calendar_app").Collection("users")

	//ROUTER
	router := mux.NewRouter().StrictSlash(true)
	api := router.PathPrefix("/api").Subrouter()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"},
		AllowedHeaders: []string{"Accept", "content-type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
	})

	api.HandleFunc("/", getDataForMonth).Methods("POST")
	api.HandleFunc("/new", postDataForMonth).Methods("POST")
	api.HandleFunc("/", patchDataForMonth).Methods("PATCH")
	api.HandleFunc("/character", getCharacter).Methods("POST")
	api.HandleFunc("/character", sendCharacter).Methods("PATCH")
	api.HandleFunc("/selectAll", selectAll).Methods("POST")
	api.HandleFunc("/unselectAll", unselectAll).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", c.Handler(router)))
}

func deleteOldData() {
	t := time.Now()

	ctx, errContext := context.WithTimeout(context.Background(), 10*time.Second)
	defer errContext()

	operation := int(t.Month() - 1)
	monthString := strconv.Itoa(operation)
	yearString := strconv.Itoa(t.Year())
	deleteQuery := monthString + "/" + yearString

	_, err := collection.DeleteOne(ctx, bson.M{"date": deleteQuery})
	if err != nil {
		fmt.Println("Error while deleting old data")
	}
}

func getDataForMonth(w http.ResponseWriter, r *http.Request) {
	req := dateFromFront{}
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	err := decoder.Decode(&req)
	if err != nil {
		fmt.Println("Error While Parsing Request Body")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	ctx, errContext := context.WithTimeout(context.Background(), 10*time.Second)
	defer errContext()

	var foundData FullDate
	errFind := collection.FindOne(ctx, bson.M{"date": req.Date}).Decode(&foundData)
	if errFind != nil {
		foundData.Date = req.Date
		foundData.DaysData = []MonthData{}
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
		fmt.Println("Error While Parsing Request Body")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	ctx, error := context.WithTimeout(context.Background(), 10*time.Second)
	defer error()

	var updatedData MonthData
	filter := bson.M{"date": req.Date}
	update := bson.M{"$push": bson.M{"daysData": bson.M{"day": req.Day, "name": req.Name}}}
	singleResult := collection.FindOneAndUpdate(ctx, filter, update).Decode(&updatedData)
	if singleResult != nil {
		selectedMonth, _ := strconv.Atoi(strings.Split(req.dateFromFront.Date, "/")[0])

		tNow := time.Now()
		thisMonth := int(tNow.Month()) - 1

		if thisMonth == 11 && selectedMonth < 3 { //TODO: code exceptions
		} else if selectedMonth < thisMonth || selectedMonth-thisMonth > 2 {
			w.WriteHeader(http.StatusForbidden)
			return
		}

		month := bson.M{
			"date": req.Date,
			"daysData": bson.A{
				bson.M{
					"day":  req.Day,
					"name": req.Name},
			},
		}

		_, nextErr := collection.InsertOne(ctx, month)
		if nextErr != nil {
			fmt.Println("Error while adding new data")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
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
	singleResult := collection.FindOneAndUpdate(ctx, bson.M{"date": req.Date}, bson.M{"$pull": bson.M{"daysData": bson.M{"day": req.Day, "name": req.Name}}}).Decode(&updatedData)
	if singleResult != nil {
		fmt.Println("Could Not Delete Data For Selected Month")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}

func getCharacter(w http.ResponseWriter, r *http.Request) {
	req := player{}
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

	var searchResult CharacterData
	errFind := collectionCharacter.FindOne(ctx, bson.M{"user": req.User}).Decode(&searchResult)

	if errFind != nil {
		fmt.Println("Data does not exist")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(searchResult)
}

func sendCharacter(w http.ResponseWriter, r *http.Request) {
	req := make(map[string]interface{})
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&req)
	if err != nil {
		fmt.Println("Error While Parsing Request Body")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	ctx, error := context.WithTimeout(context.Background(), 10*time.Second)
	defer error()

	mongoResult := collectionCharacter.FindOneAndReplace(ctx, bson.M{"user": req["user"]}, req)
	if mongoResult.Err() != nil {
		fmt.Println(mongoResult.Err())
		_, nextErr := collectionCharacter.InsertOne(ctx, req)
		if nextErr != nil {
			fmt.Println("Error while adding new character data")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}

func selectAll(w http.ResponseWriter, r *http.Request) {
	req := userDate{}
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()
	err := decoder.Decode(&req)
	if err != nil {
		fmt.Println("Error While Parsing Request Body")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	m, _ := strconv.Atoi(strings.Split(req.dateFromFront.Date, "/")[0])
	y, _ := strconv.Atoi(strings.Split(req.dateFromFront.Date, "/")[1])

	currentDay := time.Now().Day()
	lastDay := time.Date(y, time.Month(m+2), 1, 0, 0, 0, -1, time.UTC).Day()

	ctx, error := context.WithTimeout(context.Background(), 10*time.Second)
	defer error()

	success := pullDaysForUser(&ctx, &req.Name, &req.dateFromFront.Date)
	if success != true {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var updatedData interface{}
	filter := bson.M{"date": req.dateFromFront.Date}

	currentMonth := int(time.Now().Month()) - 1
	if currentMonth != m {
		currentDay = 1
	}

	for ; currentDay <= lastDay; currentDay++ {
		update := bson.M{"$push": bson.M{"daysData": bson.M{"day": strconv.Itoa(currentDay), "name": req.Name}}}
		singleResult := collection.FindOneAndUpdate(ctx, filter, update).Decode(&updatedData)
		if singleResult != nil {
			fmt.Println(singleResult)
		}
	}

	w.WriteHeader(http.StatusOK)
}

func unselectAll(w http.ResponseWriter, r *http.Request) {
	req := userDate{}
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

	success := pullDaysForUser(&ctx, &req.Name, &req.dateFromFront.Date)
	if success != true {
		w.WriteHeader(http.StatusBadRequest)
	}

	w.WriteHeader(http.StatusOK)
}

func pullDaysForUser(ctx *context.Context, user *string, date *string) bool {
	filter := bson.M{"date": *date}
	update := bson.M{"$pull": bson.M{"daysData": bson.M{"name": bson.D{{"$in", bson.A{*user}}}}}}
	_, err := collection.UpdateMany(*ctx, filter, update)
	if err != nil {
		return false
	}
	return true
}
