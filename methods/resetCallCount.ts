import { Request, Response } from 'express';
const airQualityModel = require('../schema');

export const resetCallCount = async (req: Request, res: Response) => {
  try {
    await airQualityModel.updateMany({}, { $set: { callCount: 0 } });
    res.status(200).send({ message: 'Call count reset successfully' });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
