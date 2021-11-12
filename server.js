import express from "express";
import mongoose from "mongoose";
import Videos from "./models/dbModels.js";
import Cors from "cors";

// app config
const app = express();
const port = 9000;

// middlewares
app.use(express.json());
app.use(Cors());

// db config
const db_url = "MONGO DB SERVER URL";
mongoose.connect(db_url).then(() => {
    console.log("Connected to database");
});

// end points
app.get("/", (req, res) => res.status(200).send("Hello world"));
app.get("/v1/posts", (req, res) => {
    Videos.find((err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(data);
    });
});
app.post("/v1/posts", (req, res) => {
    const dbVideos = req.body;
    Videos.create(dbVideos, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send(data);
    });
});

// listener
app.listen(port, () => console.log(`Listening on localhost:${port}`));
