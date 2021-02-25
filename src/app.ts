import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();
import './database';
import router from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

export default app;
