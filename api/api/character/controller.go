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
		_, err := mongo.CollectionCharacter.InsertOne(ctx, character)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("No Character Exists")) //TODO: test it
			return
		}
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
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("No Character Exists"))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(character.Character)
}
