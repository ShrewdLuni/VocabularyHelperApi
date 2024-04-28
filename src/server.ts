import express from "express";
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from "mongoose";

import router from "./router";

const app = express()
const PORT = 8080;
const server = http.createServer(app);

app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const DATABASE_URL="mongodb+srv://Shewd:VaS22xgmrzrA9zYd@vocabularyhelperdb.ea34ucy.mongodb.net/?retryWrites=true&w=majority"



app.use('/', router());

server.listen(PORT,() => console.log(`Server is live at http://localhost:${PORT}`));