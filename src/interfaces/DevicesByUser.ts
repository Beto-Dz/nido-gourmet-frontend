export interface DevicesByUser {
    ok:   boolean;
    msg:  string;
    data: Datum[];
}

export interface Datum {
    location:     Location;
    floodgates:   { [key: string]: Floodgate };
    isActive:     boolean;
    batteryLevel: number;
    user:         string;
    id:           string;
}

export interface Floodgate {
    monday:    Day;
    tuesday:   Day;
    wednesday: Day;
    thursday:  Day;
    friday:    Day;
    saturday:  Day;
    sunday:    Day;
    visits:    Date[];
    _id:       string;
}

export interface Day {
    startTime: StartTime;
    endTime:   EndTime;
    _id:       string;
}

export enum EndTime {
    The2300 = "23:00",
}

export enum StartTime {
    The0000 = "00:00",
}

export interface Location {
    type:        string;
    coordinates: number[];
}
