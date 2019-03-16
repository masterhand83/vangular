import { Moment } from 'moment';
import { IActivityConfig } from '../interfaces/IActivity.config';
import { BasicDrawer } from './basicDrawer';
import * as moment from 'moment'
import { IElement } from '../interfaces/IElement';
import { constants } from '../const';

export class Activity implements IElement {




    private drawer: BasicDrawer;

    private duration = 0;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private index: number;

    private name: string;
    private color: string;

    private start: Moment;
    private end: Moment;

    private info?: any | any[];

    private ganttStart: Moment;

    constructor(data: IActivityConfig, drawer: BasicDrawer, fullstart: Moment) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.index = data.index;
        this.name = data.name;
        this.color = data.color;
        if (moment.isMoment(data.start) && moment.isMoment(data.end)) {
            this.start = data.start;
            this.end = data.end;
        }else{
            this.start = moment(data.start);
            this.end = moment(data.end);
        }

        this.drawer = drawer;

        this.ganttStart = fullstart;

        if (data.data) {
            this.info = data.data;
        }
    }
    // * Overrides
    draw(): void {
        this.calculateActivity();
        this.drawActivity();
        //console.log(this.info);
    }
    update(): void {
        throw new Error('Method not implemented.');
    }
    // * /Overrides

    private calculateActivity() {
        const start = this.start.clone();
        const end = this.end.clone();
        const ganttSt = this.ganttStart.clone();

        const duration = end.diff(start, 'days');
        this.duration = duration;
        // console.log(duration);

        const fromGanttStart = start.diff(ganttSt, 'days');
        // console.log(fromGanttStart + 1);
        const isToday = start.isSame(new Date(), 'date');
        // console.log(isToday)
        if (isToday) {
            this.width = duration + 1;
        } else {
            this.width = duration;
        }
        this.x = fromGanttStart + 1;
        this.height = 15;
        this.y = constants.yScale * this.index;
        // console.log(`${constants.yScale} * ${this.index}`)
    }

    private drawActivity() {
        // console.log(this.drawer);

        this.drawer.drawBox({
            x : this.x,
            y : this.y,
            width: this.width ,
            height: this.height,
            color: this.color,
            label: `${this.name}: ${this.duration!} dias`
        });
    }

    mouseover(x: number, y: number) {
        const scaledX = this.x * constants.xScale;
        const scaledY = this.y * constants.yScale;
        const scaledW = this.width * constants.xScale;
        const scaledH = this.height * constants.heightScale;

        const isInsideX = scaledX < x && x < scaledX + scaledW;
        const isInsideY = scaledY < y && y < scaledY + scaledH;
        /*if (isInsideX && isInsideY) {
            console.log(`${this.name}: ${isInsideX && isInsideY}`);
        }*/
        return isInsideX && isInsideY;
    }

    click(f: (data: any | any[]) => void) {
        if (this.info) {
            f(this.info);
        } else {
            f('none');
        }
    }
}
