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
const createNewDocument_1 = require("./methods/createNewDocument");
const getMonitorDataFromDatabase_1 = require("./methods/getMonitorDataFromDatabase");
const updateDatabaseDocument_1 = require("./methods/updateDatabaseDocument");
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
exports.db = mongoose.connection;
exports.db.on("error", console.error.bind(console, "connection error: "));
exports.db.once("open", function () {
    console.log("Connected successfully");
});
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send('Server is up and running!');
}));
app.get('/api', getMonitorDataFromDatabase_1.getMonitorDataFromDatabase);
app.post('/api', createNewDocument_1.createNewDocument);
app.put('/api', updateDatabaseDocument_1.updateDatabaseDocument);
let port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
