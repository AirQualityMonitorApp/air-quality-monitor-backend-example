export type DataType = {
    realTimeData: RealTimeData,
    history: [RealTimeData]
};

export type RealTimeData = {
    AQScore: number,
    co2: number,
    humidity: number,
    pm: number,
    temperature: number,
    tvoc: number,
    timestamp: Date,
    callCount: number
};

export type Request = {
    body: DataType
};

type IdDataType = {
    userId: string
};

type UserDataType = {
    email: string,
    password: string
};

export type UserRequest = {
    body: UserDataType
};
