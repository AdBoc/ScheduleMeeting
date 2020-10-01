package calendar

type date struct {
	Month int `json:"month" bson:"month"`
	Year  int `json:"year" bson:"year"`
}

type dayObject struct {
	Day  int    `json:"day" bson:"day"`
	User string `json:"user" bson:"user"`
}

type fullMonthData struct {
	date
	DaysData []dayObject `json:"daysData" bson:"daysData"`
}

type newDay struct {
	date
	dayObject
}

type userDate struct {
	date
	User string `json:"user" bson:"user"`
}
