package mongo

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	CollectionCalendar  *mongo.Collection
	CollectionCharacter *mongo.Collection
)

type Db struct {
	Client *mongo.Client
	cancel context.CancelFunc
	ctx    context.Context
}

func (Db *Db) Init() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	Db.ctx = ctx
	Db.cancel = cancel

	CollectionCalendar = client.Database("calendar_app").Collection("calendar")
	CollectionCharacter = client.Database("calendar_app").Collection("character")
}

func (Db *Db) Close() {
	Db.cancel()
	if err := Db.Client.Disconnect(Db.ctx); err != nil {
		panic(err)
	}
}
