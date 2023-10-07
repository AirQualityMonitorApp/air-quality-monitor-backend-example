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
    const data = req.body;
    const realTimeData = {
        aqScore: data.aqScore,
        co2: data.co2,
        humidity: data.humidity,
        pm25: data.pm25,
        pm10: data.pm10,
        tempCelsius: data.tempCelsius,
        tempFahrenheit: data.tempFahrenheit,
        vocIndex: data.vocIndex,
        tvoc: data.tvoc,
        timestamp: new Date()
    };
    try {
        const doc = yield airQualityModel.findOne({ uid: userId });
        doc.airQuality = realTimeData;
        doc.history.push(realTimeData);
        yield doc.save();
        // await doc.updateOne({$push: {history: {
        //         aqScore: data.aqScore,
        //         co2: data.co2,
        //         humidity: data.humidity,
        //         pm25: data.pm25,
        //         pm10: data.pm10,
        //         tempCelsius: data.tempCelsius,
        //         tempFahrenheit: data.tempFahrenheit,
        //         vocIndex: data.vocIndex,
        //         tvoc: data.tvoc,
        //         timestamp: new Date()
        //         }
        //     }
        // });
        res.status(200).send(doc);
    }
    catch (error) {
        res.json({ message: error });
    }
});
exports.updateDatabaseDocument = updateDatabaseDocument;
