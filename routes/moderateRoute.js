import express from "express";
import { fetchJokes, fetchOneJoke, editJoke, removeJoke, submitJokeToDeliver } from "../controllers/moderateController.js";

const route = express.Router();

route.get("/jokes", fetchJokes);
route.get("/jokes/:id", fetchOneJoke);
route.put("/joke/:id", editJoke);
route.delete("/joke/:id", removeJoke);
route.post("/submitToDeliver", submitJokeToDeliver);

export default route;
