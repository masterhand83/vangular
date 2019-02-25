import { IActivityConfig } from "../interfaces/IActivity.config";
import { BasicDrawer } from "./basicDrawer";
import { GanttChart } from "./ganttChart";

export class GanttManager{
    private canvas: HTMLCanvasElement

    private drawer: BasicDrawer;

    private acts: IActivityConfig[];

    private gantt: GanttChart;

    constructor(){
        this.canvas = <HTMLCanvasElement>document.querySelector('#gantt-interface');
        this.drawer =  new BasicDrawer(this.canvas);
        this.acts = [];
        this.gantt = new GanttChart(this.drawer,this.canvas);

    }

    init(activities: IActivityConfig[]){
        if (activities.length > 0) {
            
            this.gantt.insertActivities(activities);
            this.gantt.draw();
            this.canvas.addEventListener('mousemove',(ev)=>{
                let rect = this.canvas.getBoundingClientRect();
                let x = ev.clientX - rect.left;
                let y = ev.clientY - rect.top;
                this.gantt.hover(x,y);
            })
        }
    }

    update(activities: IActivityConfig[]){
        this.gantt.updateActivities(activities);
    }

    onActivityClick(f: (data: any | any[])=> void){
        this.canvas.addEventListener('click', (event)=>{
            let rect = this.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            this.gantt.click({x,y},f);
        })
    }
}