"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AirQualitySchema = new mongoose_1.default.Schema({
    uid: {
        type: String
    },
    airQuality: {
        aqScore: {
            type: Number,
            default: null
        },
        tempCelsius: {
            type: Number,
            default: null
        },
        tempFahrenheit: {
            type: Number,
            default: null
        },
        co2: {
            type: Number,
            default: null
        },
        tvoc: {
            type: Number,
            default: null
        },
        vocIndex: {
            type: Number,
            default: null
        },
        humidity: {
            type: Number,
            default: null
        },
        pm25: {
            type: Number,
            default: null
        },
        pm10: {
            type: Number,
            default: null
        },
        timestamp: Date,
    },
    history: []
});
const AirQuality = mongoose_1.default.model("AirQuality", AirQualitySchema);
module.exports = AirQuality;
