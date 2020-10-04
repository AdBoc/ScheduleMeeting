package character

type characterData struct {
	User      string `json:"user" bson:"user"`
	Character string `json:"character" bson:"character"`
}
