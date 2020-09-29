package calendar

type Date struct {
	Month int `json:"month" bson:"month"`
	Year  int `json:"year" bson:"year"`
}

type DayObject struct {
	Day  int    `json:"day" bson:"day"`
	User string `json:"user" bson:"user"`
}

type FullMonthData struct {
	Date
	DaysData []DayObject `json:"daysData" bson:"daysData"`
}

type NewDay struct {
	Date
	DayObject
}

type UserDate struct {
	Date
	User string `json:"user" bson:"user"`
}
