import express, { Express, Request, Response } from "express";
import apiRouter from './src/routes';
import connectionDB from './connection/connection';
const cors = require('cors')

const morgan = require('morgan');
const app: Express = express();
const port = 3000;

app.use(cors({ origin: true }));
app.use(morgan('dev'));
app.use(express.json()); 
app.use(apiRouter);

connectionDB();

app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});