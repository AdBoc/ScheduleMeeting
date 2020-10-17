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
		character.Character = "{\"TemporaryHitPoints\":1,\"MainStats\":{\"Level\":0,\"HitPoints\":1,\"ArmorClass\":1,\"Initiative\":1,\"Speed\":1,\"PassivePerception\":1},\"Stats\":{\"Strength\":0,\"Dexterity\":0,\"Constitution\":0,\"Intelligence\":0,\"Wisdom\":0,\"Charisma\":0},\"Skills\":{\"Athletics\":-5,\"Acrobatics\":-5,\"SleightOfHand\":-5,\"Stealth\":-5,\"Arcana\":-5,\"History\":-5,\"Investigation\":-5,\"Nature\":-5,\"Religion\":-5,\"AnimalHandling\":-5,\"Insight\":-5,\"Medicine\":-5,\"Perception\":-5,\"Survival\":-5,\"Deception\":-5,\"Intimidation\":-5,\"Performance\":-5,\"Persuasion\":-5},\"Story\":{\"Name\":\"\",\"Alignment\":\"\",\"Background\":\"\",\"Class\":\"\",\"FeaturesAndTraits\":\"\",\"ExperiencePoints\":\"\",\"ProficienciesAndLanguage\":\"\",\"Race\":\"\",\"Story\":\"\"},\"Attacks\":[],\"Equipment\":[],\"Effects\":[],\"Spells\":[],\"Other\":{\"TaggedThrows\":[null,null],\"TaggedSkills\":[],\"Currency\":{\"PP\":0,\"GP\":0,\"EP\":0,\"SP\":0,\"CP\":0},\"Inspiration\":false,\"SpellSlots\":[0,0,0,0,0,0,0,0,0],\"ShortRestSlots\":[0,0,0,0,0,0,0,0,0],\"CurrentSlots\":[0,0,0,0,0,0,0,0,0],\"SpellProficiency\":null},\"DiceSim\":{\"status\":false,\"dices\":[]}}"
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
