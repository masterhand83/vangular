export class Drawer{
    static ctx?:CanvasRenderingContext2D;
    static context:any;
    static readonly scale:number = 20;
    set ctx(ctx:CanvasRenderingContext2D){
        this.ctx = <CanvasRenderingContext2D> ctx;
    }
    static drawpin(index:number,y:number,y2:number,label:string,color:string,fontcolor?:string){
        let context = <CanvasRenderingContext2D> this.ctx;
        if(fontcolor)
            context.fillStyle = fontcolor;
        context.strokeStyle = color;
        context.beginPath();
        context.fillText(label,index*Drawer.scale,y-3);
        context.moveTo(index*Drawer.scale,y);
        context.lineTo(index*Drawer.scale,y2);
        context.stroke();
        context.closePath();
    }
    static drawText(text:string,x:number,y:number){
        let context = <CanvasRenderingContext2D> this.ctx;
        context.beginPath();
        context.font = '11.5pt Sans-serif';
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.lineJoin = 'miter';
        context.miterLimit = 2;
        context.strokeText(text,x,y);
        context.fillStyle = 'white';
        context.fillText(text,x,y);
        context.closePath();
    }
    static drawBackground(color:string,canvas: HTMLCanvasElement){
        let context = <CanvasRenderingContext2D> this.ctx;
        context.fillStyle = color;
        context.fillRect(0,0,canvas.width,canvas.height);
    }
}