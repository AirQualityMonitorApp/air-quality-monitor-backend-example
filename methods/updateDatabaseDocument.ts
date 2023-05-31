import { Response, Request } from "express";

const airQualityModel = require('../schema');

export const updateDatabaseDocument = async (req: Request, res: Response) => {

    const userId = req.headers.userid

    const data = req.body

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
    }
    try {
        const doc = await airQualityModel.findOne({ uid: userId })
        await doc.updateOne(realTimeData)

        res.status(200).send(doc);
    } catch (error) {
        res.json({message: error})
    }
}
