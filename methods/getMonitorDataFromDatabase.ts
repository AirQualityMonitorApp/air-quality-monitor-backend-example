import { Response, Request } from "express";

const airQualityModel = require('../schema');

export const getMonitorDataFromDatabase = async (req: Request, res: Response) => {
    const userId = req.headers.userid
    try {
        const document = await airQualityModel.find({uid: userId})
        if (document.length > 0) {
            res.status(200).json(document)
        } else {
            res.status(400).json({message: "Error: document not found!"})
        }
    } catch(error) {
        res.status(500).json(error)
    };
};
