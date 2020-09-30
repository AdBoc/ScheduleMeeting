package utils

import (
	"context"
	"dndApi/services/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

func PullDaysForUser(ctx *context.Context, user string, month int, year int) bool {
	filter := bson.M{"month": month, "year": year}
	update := bson.M{"$pull": bson.M{"daysData": bson.M{"user": bson.D{{"$in", bson.A{user}}}}}}
	_, err := mongo.CollectionCalendar.UpdateMany(*ctx, filter, update)
	if err != nil {
		return false
	}
	return true
}

func SelectedDaysRange(year int, month int) (startDay, endDay int) {
	currentDate := time.Now()
	currentMonth := int(currentDate.Month()) - 1
	startDay = currentDate.Day()

	if currentMonth != month {
		startDay = 1
	}

	endDay = time.Date(year, time.Month(month+2), 1, 0, 0, 0, -1, time.UTC).Day()
	return
}

func VerifyMonthLimit(newMonth int, newYear int) bool {
	currentDate := time.Now()
	currentYear := currentDate.Year()

	currentMonth := int(currentDate.Month())
	nextMonth := int(currentDate.Month() + 1)
	nextNextMonth := int(currentDate.Month() + 2)

	if newMonth == currentMonth && newYear == currentYear {
		return true
	}

	if currentMonth+1 > 11 {
		currentYear++
		nextMonth = (currentMonth + 1) % 12
		nextNextMonth = (currentMonth + 2) % 12
	} else if currentMonth+2 > 11 {
		currentYear++
		nextNextMonth = (currentMonth + 2) % 12
	}

	if newMonth == nextMonth && newYear == currentYear || newMonth == nextNextMonth && newYear == currentYear {
		return true
	}
	return false
}
