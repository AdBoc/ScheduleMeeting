package calendar

import (
	"context"
	"dndApi/services/mongo"
	"dndApi/utils"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"time"
)

func sendMonthData(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var date Date

	if err := json.NewDecoder(r.Body).Decode(&date); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var searchResult FullMonthData
	filter := bson.M{"month": date.Month, "year": date.Year}
	err := mongo.CollectionCalendar.FindOne(ctx, filter).Decode(&searchResult)
	if err != nil {
		searchResult.Month = date.Month
		searchResult.Year = date.Year
		searchResult.DaysData = []DayObject{}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(searchResult)
}

func addDayInMonth(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var newDay NewDay

	if err := json.NewDecoder(r.Body).Decode(&newDay); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"month": newDay.Month, "year": newDay.Year}
	update := bson.M{"$push": bson.M{"daysData": bson.M{"day": newDay.Day, "user": newDay.User}}}

	searchResult := mongo.CollectionCalendar.FindOneAndUpdate(ctx, filter, update)
	if searchResult.Err() != nil {
		result := utils.VerifyMonthLimit(newDay.Month+1, newDay.Year)
		if result == false {
			w.WriteHeader(http.StatusForbidden)
			return
		}

		newMonth := bson.M{
			"month": newDay.Month,
			"year":  newDay.Year,
			"daysData": bson.A{
				bson.M{
					"day":  newDay.Day,
					"user": newDay.User},
			},
		}
		_, err := mongo.CollectionCalendar.InsertOne(ctx, newMonth)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
}

func deleteDayInMonth(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var deletedDay NewDay

	if err := json.NewDecoder(r.Body).Decode(&deletedDay); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"month": deletedDay.Month, "year": deletedDay.Year}
	update := bson.M{"$pull": bson.M{"daysData": bson.M{"day": deletedDay.Day, "user": deletedDay.User}}}

	searchResult := mongo.CollectionCalendar.FindOneAndUpdate(ctx, filter, update)
	if searchResult.Err() != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}

func selectAllInMonth(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var reqDate UserDate

	if err := json.NewDecoder(r.Body).Decode(&reqDate); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result := utils.VerifyMonthLimit(reqDate.Month+1, reqDate.Year)
	if result != true {
		w.WriteHeader(http.StatusForbidden)
		return
	}

	success := utils.PullDaysForUser(&ctx, reqDate.User, reqDate.Month, reqDate.Year) //TODO: instead of bool create custom error
	if success != true {
		w.WriteHeader(http.StatusBadRequest) //TODO: if selected and month does not exist then error shows
		return
	}

	startDay, endDay := utils.SelectedDaysRange(reqDate.Year, reqDate.Month)

	filter := bson.M{"month": reqDate.Month, "year": reqDate.Year}
	for ; startDay <= endDay; startDay++ { //TODO: instead of searching for 30 days push them all into array
		update := bson.M{"$push": bson.M{"daysData": bson.M{"day": startDay, "user": reqDate.User}}}
		singleResult := mongo.CollectionCalendar.FindOneAndUpdate(ctx, filter, update)
		if singleResult.Err() != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
}

func unselectAllInMonth(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var reqDate UserDate

	if err := json.NewDecoder(r.Body).Decode(&reqDate); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	success := utils.PullDaysForUser(&ctx, reqDate.User, reqDate.Month, reqDate.Year) //TODO: instead of bool create custom error
	if success != true {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}
