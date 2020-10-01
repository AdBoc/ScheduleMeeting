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
	var date date

	if err := json.NewDecoder(r.Body).Decode(&date); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var searchResult fullMonthData
	filter := bson.M{"month": date.Month, "year": date.Year}
	err := mongo.CollectionCalendar.FindOne(ctx, filter).Decode(&searchResult)
	if err != nil {
		searchResult.Month = date.Month
		searchResult.Year = date.Year
		searchResult.DaysData = []dayObject{}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(searchResult)
}

func addDayInMonth(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var newDay newDay

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
		err := utils.VerifyMonthLimit(newDay.Month+1, newDay.Year)
		if err != nil {
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
		_, err = mongo.CollectionCalendar.InsertOne(ctx, newMonth)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
}

func deleteDayInMonth(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var deletedDay newDay

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

	w.WriteHeader(http.StatusOK)
}

func selectAllInMonth(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var reqDate userDate

	if err := json.NewDecoder(r.Body).Decode(&reqDate); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := utils.VerifyMonthLimit(reqDate.Month+1, reqDate.Year)
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		return
	}

	err = utils.PullDaysForUser(&ctx, reqDate.User, reqDate.Month, reqDate.Year)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	monthDays := make([]dayObject, 0, 32)
	startDay, endDay := utils.SelectedDaysRange(reqDate.Year, reqDate.Month)
	for ; startDay <= endDay; startDay++ {
		monthDays = append(monthDays, dayObject{Day: startDay, User: reqDate.User})
	}

	filter := bson.M{"month": reqDate.Month, "year": reqDate.Year}
	update := bson.M{"$push": bson.M{"daysData": bson.M{"$each": monthDays}}}
	singleResult := mongo.CollectionCalendar.FindOneAndUpdate(ctx, filter, update)
	if singleResult.Err() != nil {
		_, err := mongo.CollectionCalendar.InsertOne(ctx, bson.M{"month": reqDate.Month, "year": reqDate.Year, "daysData": monthDays})
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
}

func unselectAllInMonth(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var reqDate userDate

	if err := json.NewDecoder(r.Body).Decode(&reqDate); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := utils.PullDaysForUser(&ctx, reqDate.User, reqDate.Month, reqDate.Year)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
}
