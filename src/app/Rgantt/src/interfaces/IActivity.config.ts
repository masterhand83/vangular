import { Moment } from "moment";

export interface IActivityConfig{
    name:string;
    color:string;

    index: number;

    start: Date;
    end: Date;

    data?: any | any[];
}