package character

type characterData struct {
	User      string `json:"user" bson:"user,omitempty"`
	Character string `json:"character,omitempty" bson:"character,omitempty"`
}
