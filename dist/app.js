"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const getMonitorDataFromDatabase_1 = require("./methods/getMonitorDataFromDatabase");
const createUser_1 = require("./methods/createUser");
const updateDatabaseDocument_1 = require("./methods/updateDatabaseDocument");
const getToken_1 = require("./methods/getToken");
const resetUserPassword_1 = require("./methods/resetUserPassword");
const sendVerificationEmail_1 = require("./methods/sendVerificationEmail");
const resetCallCount_1 = require("./methods/resetCallCount");
const deleteUser_1 = require("./methods/deleteUser");
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
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
});
exports.db = mongoose.connection;
exports.db.on("error", console.error.bind(console, "connection error: "));
exports.db.once("open", function () {
    console.log("Connected successfully");
});
app.put('/resetCallCount', resetCallCount_1.resetCallCount);
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send('Server is up and running!');
}));
app.get('/api/my', getToken_1.requestToken, getMonitorDataFromDatabase_1.getMonitorDataFromDatabase);
app.get('requestToken', getToken_1.requestToken);
app.post('/user', createUser_1.createUser);
app.put('/api', updateDatabaseDocument_1.updateDatabaseDocument);
app.post('/resetPassword', resetUserPassword_1.resetUserPassword);
app.post('/verifyEmail', sendVerificationEmail_1.sendVerificationEmail);
app.delete('/deleteUser', getToken_1.requestToken, deleteUser_1.deleteUser);
let port = process.env.PORT;
app.listen(port, () => console.log(`App listening on port ${port}!`));
module.exports.server = sls(app);
