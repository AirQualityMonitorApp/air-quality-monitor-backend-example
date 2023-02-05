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
exports.getMonitorDataFromDatabase = void 0;
const airQualityModel = require('../schema');
const getMonitorDataFromDatabase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userid;
    try {
        const document = yield airQualityModel.find({ uid: userId });
        if (document.length > 0) {
            res.status(200).json(document);
        }
        else {
            res.status(400).json({ message: "Error: document not found!" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
    ;
});
exports.getMonitorDataFromDatabase = getMonitorDataFromDatabase;
