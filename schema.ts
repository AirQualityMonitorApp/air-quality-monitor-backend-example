import mongoose from 'mongoose';

const AirQualitySchema = new mongoose.Schema({
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

const AirQuality = mongoose.model("AirQuality", AirQualitySchema)

module.exports = AirQuality;
