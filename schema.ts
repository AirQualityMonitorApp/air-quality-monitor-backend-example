import mongoose from 'mongoose';

const AirQualitySchema = new mongoose.Schema({
    uid: {
        type: String
    },
    aqScore: {
        type: Number,
        default: 0
    },
    tempCelsius: {
        type: Number,
        default: 0
    },
    tempFahrenheit: {
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
    vocIndex: {
        type: Number,
        default: 0
    },
    humidity: {
        type: Number,
        default: 0
    },
    pm25: {
        type: Number,
        default: 0
    },
    pm10: {
        type: Number,
        default: 0
    },
    timestamp: Date,
    history: []
});

const AirQuality = mongoose.model("AirQuality", AirQualitySchema)

module.exports = AirQuality;
