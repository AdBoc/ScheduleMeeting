package character

import (
	"context"
	"dndApi/services/mongo"
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"time"
)

func receiveCharacter(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var character characterData
	if err := json.NewDecoder(r.Body).Decode(&character); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	searchResult := mongo.CollectionCharacter.FindOneAndReplace(ctx, bson.M{"user": character.User}, character)
	if searchResult.Err() != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}

func sendCharacter(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var character characterData
	if err := json.NewDecoder(r.Body).Decode(&character); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err := mongo.CollectionCharacter.FindOne(ctx, bson.M{"user": character.User}).Decode(&character)
	if err != nil {
		character.Character = "{\"stats\":{\"strength\":1,\"dexterity\":1,\"constitution\":1,\"intelligence\":1,\"wisdom\":1,\"charisma\":1},\"spells\":[],\"skills\":{\"athletics\":{\"value\":-5,\"isTagged\":false},\"acrobatics\":{\"value\":-5,\"isTagged\":false},\"sleightOfHand\":{\"value\":-5,\"isTagged\":false},\"stealth\":{\"value\":-5,\"isTagged\":false},\"arcana\":{\"value\":-5,\"isTagged\":false},\"history\":{\"value\":-5,\"isTagged\":false},\"investigation\":{\"value\":-5,\"isTagged\":false},\"nature\":{\"value\":-5,\"isTagged\":false},\"religion\":{\"value\":-5,\"isTagged\":false},\"animalHandling\":{\"value\":-5,\"isTagged\":false},\"insight\":{\"value\":-5,\"isTagged\":false},\"medicine\":{\"value\":-5,\"isTagged\":false},\"perception\":{\"value\":-5,\"isTagged\":false},\"survival\":{\"value\":-5,\"isTagged\":false},\"deception\":{\"value\":-5,\"isTagged\":false},\"intimidation\":{\"value\":-5,\"isTagged\":false},\"performance\":{\"value\":-5,\"isTagged\":false},\"persuasion\":{\"value\":-5,\"isTagged\":false}},\"other\":{\"taggedThrows\":[\"strength\",\"dexterity\"],\"taggedSkills\":[],\"currency\":{\"pP\":0,\"gP\":0,\"eP\":0,\"sP\":0,\"cP\":0},\"inspiration\":false,\"spellSlots\":[0,0,0,0,0,0,0,0,0],\"shortRestSlots\":[0,0,0,0,0,0,0,0,0],\"currentSlots\":[0,0,0,0,0,0,0,0,0],\"spellProficiency\":null},\"equipment\":[],\"effects\":[],\"characterStats\":{\"level\":1,\"temporaryHitPoints\":1,\"hitPoints\":1,\"armorClass\":1,\"initiative\":1,\"speed\":1,\"passivePerception\":1},\"background\":{\"name\":\"\",\"alignment\":\"\",\"background\":\"\",\"class\":\"\",\"featuresAndTraits\":\"\",\"experiencePoints\":\"\",\"proficienciesAndLanguage\":\"\",\"race\":\"\",\"story\":\"\"},\"attacks\":[]}"
		_, err := mongo.CollectionCharacter.InsertOne(ctx, character)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(character.Character)
}

func deleteCharacter(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var userName map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&userName); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"user": userName["user"]}
	_, err := mongo.CollectionCharacter.DeleteOne(ctx, filter)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
	}
	w.WriteHeader(http.StatusOK)
}
