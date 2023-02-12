import { Response, Request } from "express";

const airQualityModel = require('../schema');

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.headers.userid
    try {
        const doc = await airQualityModel.findOne({ uid: userId })

        await doc.delete()
        res.status(200).json({message: "User deleted successfully"})
    } catch(error: any) {
        res.status(error.status).json({message: error})
    }
}
