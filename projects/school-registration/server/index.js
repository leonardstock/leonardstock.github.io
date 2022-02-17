// server/index.js

const express = require("express");
const mongodb = require("mongodb");

const PORT = process.env.PORT || 3001;

const app = express();

const mongoClient = mongodb.MongoClient;

const uri = "mongodb+srv//test:test@cluster0.0c6sk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoClient.connect(uri, {autoReconnect: true}, (err, database) => {
	if (err) {
		console.error(err);
	}
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!", message2: "!" });
});

app.post("/api", (req, res) => {
	res.send({ message2: "Moin Meister" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
