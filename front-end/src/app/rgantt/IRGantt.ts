import { Activity } from "./Activity";
import { GanttManager } from "./GanttManager";
import { IActivity } from "./IActivity";

export interface IRGantt{
    acts:Activity[];
    gantt: GanttManager | null;
    setActivities: (actis:IActivity[]) => void;
    createGantt: () => void;
    onclick: (custom: (e:MouseEvent,realid:string,args?:any) => void,args?:any) => void;
}