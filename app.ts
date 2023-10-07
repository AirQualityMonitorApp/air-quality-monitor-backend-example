import { Response, Request, NextFunction } from "express";
import { createNewDocument } from "./methods/createNewDocument";
import { getMonitorDataFromDatabase } from "./methods/getMonitorDataFromDatabase";
import { updateDatabaseDocument } from "./methods/updateDatabaseDocument";

require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

export const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Server is up and running!')
});
app.get('/api', getMonitorDataFromDatabase);
app.post('/api', createNewDocument);
app.put('/api', updateDatabaseDocument);

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
