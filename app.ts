import { Response, Request, NextFunction } from "express";
import { getMonitorDataFromDatabase } from "./methods/getMonitorDataFromDatabase";
import { createUser } from "./methods/createUser";
import { updateDatabaseDocument } from "./methods/updateDatabaseDocument";
import { requestToken } from "./methods/getToken";
import { resetUserPassword } from "./methods/resetUserPassword";
import { sendVerificationEmail } from "./methods/sendVerificationEmail";
import { resetCallCount } from './methods/resetCallCount';
import { deleteUser } from './methods/deleteUser';

const express = require('express');
const sls = require('serverless-http');
const cron = require('node-cron');

require('dotenv').config();

const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  }
);

export const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Server is up and running!')
});
app.get('/api/my', requestToken, getMonitorDataFromDatabase);
app.get('/request-token', requestToken);

app.post('/api/create-user', createUser);
app.post('/api/reset-password', resetUserPassword);
app.post('/api/verify-email', sendVerificationEmail);

app.put('/api', updateDatabaseDocument);

app.delete('/api/my/delete-user', requestToken, deleteUser);

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
  cron.schedule('0 0 * * *', resetCallCount, {
    scheduled: true,
    timezone: "Europe/Berlin"
  });
});

module.exports.server = sls(app);
