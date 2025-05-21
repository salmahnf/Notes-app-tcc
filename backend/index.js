import express from "express";
import cors from "cors";
import "./model/index.js";
import Route from "./routes/Routes.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 5000;

// CORS Options Configuration
const corsOptions = {
  origin: "https://t6-fe-salma-dot-a-09-450915.uc.r.appspot.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(Route);

app.listen(port, () => console.log("Server Up and Running..."));
