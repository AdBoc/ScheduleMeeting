package utils

import (
	"context"
	"dndApi/services/mongo"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

func PullDaysForUser(ctx *context.Context, user string, month int, year int) error {
	filter := bson.M{"month": month, "year": year}
	update := bson.M{"$pull": bson.M{"daysData": bson.M{"user": bson.D{{"$in", bson.A{user}}}}}}
	_, err := mongo.CollectionCalendar.UpdateMany(*ctx, filter, update)
	if err != nil {
		return errors.New("error in mongo operation")
	}
	return nil
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

func VerifyMonthLimit(newMonth int, newYear int) error {
	currentDate := time.Now()
	currentYear := currentDate.Year()

	currentMonth := int(currentDate.Month())
	nextMonth := int(currentDate.Month() + 1)
	nextNextMonth := int(currentDate.Month() + 2)
	currentCurrentYear := currentYear

	if newMonth == currentMonth && newYear == currentYear {
		return nil
	}

	if currentMonth+1 > 11 {
		currentYear++
		nextMonth = (currentMonth + 1) % 12
		nextNextMonth = (currentMonth + 2) % 12
	} else if currentMonth+2 > 11 {
		currentCurrentYear++
		nextNextMonth = (currentMonth + 2) % 12
	}

	if newMonth == nextMonth && newYear == currentYear || newMonth == nextNextMonth && newYear == currentCurrentYear {
		return nil
	}
	return errors.New("date is out of bounds")
}
