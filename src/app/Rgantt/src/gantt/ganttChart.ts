import { BasicDrawer } from "./basicDrawer";
import * as moment from "moment";
import { IElement } from "../interfaces/IElement";
import {constants} from '../const';
import { Activity } from "./activity";
import { Moment } from "moment";
import { IActivityConfig } from "../interfaces/IActivity.config";
export class GanttChart implements IElement{
    
    
    private activities: Activity[];
    private drawer: BasicDrawer;
    private canvas: HTMLCanvasElement;
    private fullStart?: Moment;
    private fullEnd?: Moment;
    constructor(drawer:BasicDrawer, canvas: HTMLCanvasElement){
        this.drawer = drawer;
        this.canvas = canvas;
        this.activities = [];
    }

    //*Overrides
    
    draw(): void {
        this.drawBoard(this.fullStart!, this.fullEnd!);
        this.drawActivities();
    }
    update(): void {
        this.drawer.clearView(this.canvas.width,this.canvas.height);
            //console.log('.')
            if (this.activities.length > 0) {
                this.draw();
            }
    }
    //* /Overrides

    insertActivities(acts: IActivityConfig[]){
        let starts = acts.map(d => moment(d.start));
        let ends = acts.map(d => moment(d.end));

        this.fullStart = this.getStart(starts);
        this.fullEnd = this.getEnd(ends);
        for (let act of acts) {
            this.activities.push(new Activity(act,this.drawer, this.fullStart));
        }
        //console.log(starts,':', ends);
    }
    flushActivities(){
        this.activities = [];
    }

    updateActivities(activs: IActivityConfig[]){
        this.flushActivities();
        this.insertActivities(activs);
        this.update();
    }
    drawActivities(){
        for (let act of this.activities) {
            act.draw();
        }
    }

    private drawBoard(fullstart: moment.Moment, fullend: moment.Moment) {
        let start = fullstart.clone();
        
        let end = fullend.clone();

        let duration = end.add(1, 'day').diff(start, 'days');

        this.canvas.width = (constants.xScale + 1) * (duration+1);
        //console.log(`before: ${this.canvas.height}`)
        this.canvas.height = (constants.yScale) * (this.activities.length+1) * 10;
        //console.log(`after: ${constants.yScale} * ${(this.activities.length+1) * 10} = ${this.canvas.height}`)
        //drawBackground(canvas.width, canvas.height);
        let temp = fullstart.clone();
    
        for (let i = 1; i <= duration+1; i++) {
            //i, 45, canvas.height, scale, temp.format('DD')
            this.drawer.drawPin({
                x: i,
                y1: 45,
                y2: this.canvas.height,
                label: temp.format('DD'),
                label_color: 'blue'
            });
            //i,25,35,scale,temp.format('MMMM'),'green'
            if (temp.format('DD') == '01' || i === 1) {
                this.drawer.drawPin({
                    x: i,
                    y1: 25,
                    y2: 35,
                    label: temp.format('MMMM'),
                    color: '#7738ff',
                    label_color: '#2a0184'
                });
            }
            temp.add(1, 'day');
        }
        //* dibujar hasta el final de generar las actividades
        this.drawToday(start);
    }

    private drawToday(fullstart: moment.Moment){
        let start = fullstart.clone();
        let today = moment(new Date()).add(1,'day');
        //console.log(today.format('DD/MMMM/YYYY'));
        //console.log(today.utc(true).format('DD/MMMM/YYYY'));
        
        let from = moment.duration(today.diff(start)).days();
        //console.log(from);
        this.drawer.drawPin({
            x: from,
            y1: 25,
            y2: this.canvas.height,
            label: 'Today',
            color: 'green',
            label_color: 'green'
        })
    }

    private getStart(starts: Moment[]): Moment{
        let st =  moment.min(starts);
        //console.log(st);
        return st;
    }
    private getEnd(ends: Moment[]): Moment {
        let ed = moment.max(ends);
        //console.log(ed);
        return ed;
    }

    hover(x:number, y:number){
        //console.log(`(${x},${y})`)
        for (let act of this.activities) {
            if(act.mouseover(x,y)){
                //console.log('cambio');
                this.canvas.style.cursor = 'pointer'
                break;
            }else{
                this.canvas.style.cursor = 'default'
                //console.log('default')
            }
        }
    }

    click(obj: {x: number, y: number},f: (data: any | any[])=> void){
        for(let act of this.activities){
            if (act.mouseover(obj.x, obj.y)) {
                act.click(f);
            }
        }
    }
}