export type DataType = {
    realTimeData: RealTimeData,
    history: [RealTimeData]
};

export type RealTimeData = {
    aqScore: number,
    co2: number,
    humidity: number,
    pm25: number,
    pm10: number,
    tempCelsius: number,
    tempFahrenheit: number,
    vocIndex: number
    tvoc: number,
    timestamp: Date,
    callCount: number
};

export type Request = {
    body: DataType
};
