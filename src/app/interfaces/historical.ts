
export interface MarketData {
    time: number;
    close: number;
    high: number;
    low: number;
    open: number;
    volumefrom: number;
    volumeto: number;
}

export interface ConversionType {
    type: string;
    conversionSymbol: string;
}


export interface Historical {
    Response: string;
    Type: number;
    Aggregated: boolean;
    Data: MarketData[];
    TimeTo: number;
    TimeFrom: number;
    FirstValueInArray: boolean;
    ConversionType: ConversionType;
    RateLimit: any;
    HasWarning: boolean;
}


