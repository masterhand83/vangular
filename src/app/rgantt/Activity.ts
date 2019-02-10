import { IActivity } from "./IActivity";
import *  as moment from "moment";
import { Drawer } from "./Drawer";
export class Activity {
    private _realid: string;
    private _name: string;
    private _color: string;
    private _id: number;
    private _start: moment.Moment;
    private _end: moment.Moment;
    private _info?: any = null;
    private _duration: number;
    private _x:number = 0;
    private _y: number = 0;
    private _width: number = 0;
    private _height: number = 50;
    readonly _scale: number = 20;
    readonly _heightscale: number = 55;
    constructor(activity: IActivity) {
        this._name = activity.name;
        this._id = activity.id;
        this._color = activity.color;
        this._start = moment(activity.start);
        this._end = moment(activity.end);
        this._info = activity.info;
        this._duration = this.getDuration();
        this._realid = activity.realid;
    }

    get start(){
        return this._start;
    }
    get end(){
        return this._end;
    }
    get duration():number{
        return this._duration;
    }
    set y(y: number){
        this._y = y;
        //console.log(`x: ${this._y2}, name: ${this._name}`);
    }
    get y():number{
        return this._y;
    }
    set x(x:number){
        this._x = x;
        //console.debug(`x: ${this._x2}, name: ${this._name}`);
    }
    get x(){
        return this._x;
    }
    get width(){
        return this._width;
    }
    set width(width: number){
        this._width = width;
    }
    get id():number{
        return this._id;
    }
    get name():string{
        return this._name;
    }
    get height():number{
        return this._height;
    }
    set height(height: number){
        this._height = height;
    }
    public getDuration(): number {
        let ending = this._end.clone();
        let days = ending.diff(this._start.clone(), 'days');
        return days ;

    }
    public calculateX(fullstart: moment.Moment){
        
        if (this.x == 0 && this.start === fullstart ) {
            this.x += 1;
        }else{
            this.x += 1;
        }
        this.x *= this._scale;
    }

    calculateWidth(){
        this.width = this.duration
        
        this.width *= this._scale;
        if (this.x === this._scale) {
            this.width += this._scale;
        }
        if (this.x > 20) {
            this.width++;
        }
    }

    calculateY(){
        this.y = this.id*this._heightscale;
    }
    /**
     * Dibuja la actividad (no se recomienda manipularlo o llamarlo directamente)
     * @param full_start El inicio del diagrama de gantt
     * @param full_end El final del diagrama de gantt
     * @param ctx el contexto del elemento canvas
     */
    public draw(full_start: moment.Moment, full_end: moment.Moment, ctx: CanvasRenderingContext2D | undefined) {
        
        let fullstart = full_start.clone();
        this.x = this.start.diff(fullstart,'days');
        
        this.calculateWidth();
        this.calculateX(full_start);
        
        
        this.calculateY();
        let description = `${this.name}: ${this.duration} dias`

        if (ctx) {
            ctx.lineWidth = 1;
            ctx.fillStyle = this._color;
            ctx.fillRect(this.x,this.y, this.width, this.height);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x,this.y,this.width,this.height);
            Drawer.drawText(description,this.x+(this.width* .015),this.y+(this.height/2));
            //ctx.fillText(description,this.x+(this.width* .015),this.y+(this.height/2),this.width);
        }
    }
    public markCell(ctx: CanvasRenderingContext2D | undefined){
        if (ctx) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x,this.y,this.width,this.height);
        }
    }
    public restoreCell(ctx: CanvasRenderingContext2D | undefined){
        if (ctx) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 0;
            ctx.strokeRect(this.x,this.y,this.width,this.height);
        }
    }
    checkMouseOver(x:number,y:number){
        let x_inside = (this.x+this.width) >= x && x >= this.x ;
        let y_inside = (this.y+this.height) >= y && y >= this.y;
        //console.log(`${this.x + this.width} > ${x} > ${this.x}: ${x_inside}`);
        //console.log(`${this.y + this.height} > ${y} > ${this.y}: ${y_inside}`);
        //console.log(`${this.id}: (${x_inside},${y_inside}) = ${x_inside && y_inside}`)
        return x_inside && y_inside;
    }
    
    public click(e:MouseEvent,x:number,y:number,custom:(e:MouseEvent,data?:any)=>void){
        if (this.checkMouseOver(x,y)) {
            custom(e,this._info);
        }
    }

}