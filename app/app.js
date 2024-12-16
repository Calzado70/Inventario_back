import express from "express";
import cors from "cors";
import { config } from "dotenv";
import ruta from "./routers/index.js";

config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(express.static("public"));
app.set("port", process.env.PORT || 4000);
app.use(ruta);

export default app;
