import { Moment } from "moment";

export interface IActivityConfig{
    name:string;
    color:string;

    index: number;

    start: Date | Moment;
    end: Date | Moment;

    data?: any | any[];
}