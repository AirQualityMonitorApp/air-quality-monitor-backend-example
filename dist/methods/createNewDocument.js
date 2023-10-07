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
exports.createNewDocument = void 0;
const crypto_1 = require("crypto");
const airQualityModel = require('../schema');
const createNewDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new airQualityModel({
        id: (0, crypto_1.randomUUID)(),
        timestamp: new Date(),
        airQuality: {},
        history: []
    });
    console.log(data);
    try {
        yield data.save();
        res.status(200).send(data);
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.createNewDocument = createNewDocument;
