import { Activity } from './Activity';
import { Ganttchart } from './Ganttchart';
import { Drawer } from './Drawer';
import { IActivity } from './IActivity';

export class GanttManager {
    private acts: Activity[] = [];
    private gantt: Ganttchart;
    private canvas: HTMLCanvasElement;
    constructor(acts: IActivity[], ctx?: CanvasRenderingContext2D, canva?: HTMLCanvasElement) {
        if (canva) {
            this.canvas = canva;
        } else {
            this.canvas = <HTMLCanvasElement>document.querySelector('#gantt-interface');
        }
        for (const act of acts) {
            this.acts.push(new Activity(act));
        }
        this.gantt = new Ganttchart(this.acts, this.canvas);
        if (canva) {
            Drawer.ctx = ctx;
        } else {
            Drawer.ctx = <CanvasRenderingContext2D> this.canvas.getContext('2d');
        }
    }
    public initialize() {
        this.canvas.setAttribute('width', String(this.gantt.fullduration * this.gantt.scale + 60));
        this.canvas.onmousemove = e => {
            this.gantt.mouseover(e);
        };

        this.gantt.draw(this.canvas);
    }
    public onclick(f: (e: MouseEvent, data?: any) => void) {
        this.canvas.onclick = e => {
            this.gantt.onclick(e, f);
        };
    }
}
