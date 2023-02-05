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
    AQScore: {
        type: Number,
        default: 0
    },
    temperature: {
        type: Number,
        default: 0
    },
    co2: {
        type: Number,
        default: 0
    },
    tvoc: {
        type: Number,
        default: 0
    },
    humidity: {
        type: Number,
        default: 0
    },
    pm: {
        type: Number,
        default: 0
    },
    timestamp: Date,
    callCount: {
        type: Number,
        default: 1
    },
    history: []
});
const AirQuality = mongoose_1.default.model("AirQuality", AirQualitySchema);
module.exports = AirQuality;
