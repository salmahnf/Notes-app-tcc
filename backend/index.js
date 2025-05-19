import express from "express";
import cors from "cors";
import "./model/index.js";
import Route from "./routes/Routes.js";
import cookieParser from "cookie-parser";

const app = express();

// CORS Options Configuration
const corsOptions = {
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(Route);

app.listen(5000, () => console.log("Server Up and Running..."));