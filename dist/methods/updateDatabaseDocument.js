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
exports.updateDatabaseDocument = void 0;
const airQualityModel = require('../schema');
const updateDatabaseDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers.userid;
    if (userId == undefined) {
        res.status(403).json({ message: "You are not authorized to perform this action" });
    }
    console.log(userId);
    const data = req.body;
    const realTimeData = {
        AQScore: data.AQScore,
        co2: data.co2,
        humidity: data.humidity,
        pm: data.pm,
        temperature: data.temperature,
        tvoc: data.tvoc,
        timestamp: new Date()
    };
    try {
        const doc = yield airQualityModel.findOne({ uid: userId });
        if (doc.callCount >= 100) {
            res.status(429).json({ message: "Daily calls limit exceeded" });
        }
        yield doc.updateOne(realTimeData);
        yield doc.updateOne({ $inc: { callCount: 50 } });
        yield doc.updateOne({ $push: { history: {
                    AQScore: data.AQScore,
                    co2: data.co2,
                    humidity: data.humidity,
                    pm: data.pm,
                    temperature: data.temperature,
                    tvoc: data.tvoc,
                    timestamp: new Date()
                }
            } });
        console.log(doc);
        res.status(200).send(doc);
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.updateDatabaseDocument = updateDatabaseDocument;
