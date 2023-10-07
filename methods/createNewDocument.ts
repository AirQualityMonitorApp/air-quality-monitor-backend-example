import { randomUUID } from "crypto";
import { Response, Request } from "express";

const airQualityModel = require('../schema');

export const createNewDocument = async (req: Request, res: Response) => {
    const data = new airQualityModel({
        id: randomUUID(),
        timestamp: new Date(),
        airQuality: {},
        history: []
    })
    console.log(data)
    try {
        await data.save()
        res.status(200).send(data);
    } catch (error) {
        res.json({message: error})
    }
}
