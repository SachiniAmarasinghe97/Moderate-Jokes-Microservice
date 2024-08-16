import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/moderateRoute.js";
import authRoute from './routes/auth.js';
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5002;

// app.use("/api/moderate", route);
app.use('/api', authRoute);
app.use('/api/moderate', route);

app.listen(PORT, () => {
  console.log(`Moderate Jokes Microservice is running on port ${PORT}`);
});