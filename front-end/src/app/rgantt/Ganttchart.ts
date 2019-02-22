import { Activity } from "./Activity";
import * as moment from 'moment';
import { Drawer } from "./Drawer";
/**
 * @class la clase Ganttchart se implementa desde un constructor de gantts (no se recomienda manipular esta clase)
 */
export class Ganttchart {
    readonly scale: number = 20;

    fullstart: moment.Moment;
    fullend: moment.Moment;
    fullduration: number;
    acts: Activity[];

    readonly height: number = 800;
    readonly width: number = 700;

    canvas: HTMLCanvasElement;
    /**
     * @constructor
     * @param acts todas las actividades creadas;
     */
    constructor(acts: Activity[],canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        this.acts = acts;
        this.fullstart = this.getFirstStart();
        this.fullend = this.getLastEnd();
        this.fullduration = this.getFullDuration();
    }
    /**
     * obtiene todos los inicios de las actividades
     */
    public getActivityStarts() {
        return this.acts.map(value => {
            return value.start;
        })
    }
    /**
     * obtiene todos los finales de las actividades
     */
    public getActivityEnds() {
        return this.acts.map(value => {
            return value.end;
        })
    }


    public getFirstStart() {
        if (this.acts.length !== 0) {
            return moment.min(this.getActivityStarts());
        } else {
            return moment();
        }
    }

    public getLastEnd() {
        if (this.acts.length !== 0) {
            return moment.max(this.getActivityEnds());
        } else {
            return moment();
        }
    }

    public getFullDuration() {
        let days = 0;
        if (this.acts.length != 0) {
            let ending = this.fullend.clone();
            let started = this.fullstart.clone();
            days = ending.diff(started,'days') +1;

        }
        return days + 1;
    }
    /**
     * Dibuja los dias de la agenda
     * @param canvas el canvas con el que se trabaja
     * @param strt el inicio de toda la agenda
     */
    public drawDays(canvas:HTMLCanvasElement,strt:moment.Moment){
        let canHeight = Number(canvas.getAttribute('height'))
        for (let i = 1; i <= this.fullduration ; i++) {
            Drawer.drawpin(i,45,canHeight,strt.format('DD'),'#1e40ff');
            
            if (strt.format('DD') === '01') {
                Drawer.drawpin(i,15,25,strt.format('MMMM'),'#f44242');
            }else if(i == 1){
                Drawer.drawpin(i,15,25,strt.format('MMMM'),'#f44242');
                Drawer.drawpin(i,25,canHeight,'','#f44242');
            }

            if (i == this.fullduration  ) {
                Drawer.drawpin(i,50,canHeight,'','#f44242');
            }
            strt.add(1,'day');
        }
    }
    /**
     * 
     * @param canvas el elemento 
     */
    public draw(canvas:HTMLCanvasElement) {
        
        let today = moment();
        if (this.acts.length != 0) {
            canvas.setAttribute('height',String((this.acts.length*55)+55))
            let canHeight = Number(canvas.getAttribute('height'))
            let strt = this.fullstart.clone();
            let maxPos = 45;
            this.drawDays(canvas,strt);
            // y + 45
            for (let act of this.acts) {
                act.draw(this.fullstart,this.fullend,Drawer.ctx);
            }
            let started = this.fullstart.clone();
            let current = today.diff(started,'days');
            Drawer.drawpin(current+2,30,canHeight,'Today','#068400','#068400');
            //this.acts[0].draw(this.fullstart,this.fullend,Drawer.ctx);
            //this.acts[1].draw(this.fullstart,this.fullend,Drawer.ctx);
            //this.acts[2].draw(this.fullstart,this.fullend,Drawer.ctx);
        } else {
            console.log('nothing');
        }
    }
    public mouseover(event: MouseEvent){
        let rect = this.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        for (const act of this.acts) {
            //console.log(act.checkMouseOver(x,y))
            if (act.checkMouseOver(x,y)) {
                this.canvas.style.cursor = 'pointer';
                //act.markCell(Drawer.ctx);
                break;
            }else{
                this.canvas.style.cursor = 'default';
                //act.restoreCell(Drawer.ctx);
            }
        }
    }
    public onclick (e:MouseEvent,custom: (e:MouseEvent,args:any) => void): void{
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        for (let act of this.acts) {
            act.click(e,x,y,custom);
        }
    }
}