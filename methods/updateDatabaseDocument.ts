import { Response, Request } from "express";

const airQualityModel = require('../schema');

export const updateDatabaseDocument = async (req: Request, res: Response) => {

    const userId = req.headers.userid

    if (userId == undefined) {
        res.status(403).json({message: "You are not authorized to perform this action"})
    }
    const data = req.body

    const realTimeData = {
        AQScore: data.AQScore,
        co2: data.co2,
        humidity: data.humidity,
        pm: data.pm,
        temperature: data.temperature,
        tvoc: data.tvoc,
        timestamp: new Date()
    }

    try {
        const doc = await airQualityModel.findOne({ uid: userId })
        if (doc.callCount >= 288) {
            res.status(429).json({message: "Daily calls limit exceeded"})
        }
        await doc.updateOne(realTimeData)
        await doc.updateOne({ $inc: { callCount: 1 } });

        /* The following code has to be added when data history will be implemented
        on the client

        await doc.updateOne({$push: {history: {
            AQScore: data.AQScore,
            co2: data.co2,
            humidity: data.humidity,
            pm: data.pm,
            temperature: data.temperature,
            tvoc: data.tvoc,
            timestamp: new Date()
            }
        })*/

        res.status(200).send(doc);
    } catch (error) {
        res.json({message: error})
    }
}
