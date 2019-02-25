
import { IPinConfig } from "../interfaces/IPin_config";
import { constants } from "../const";
import { IBoxConfig } from "../interfaces/IBox.config";
export class BasicDrawer{
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private readonly yScale = constants.yScale;
    private readonly xScale = constants.xScale;

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.ctx = <CanvasRenderingContext2D> canvas.getContext('2d');
        
    }

    drawBox(config: IBoxConfig){
        
        let ctx = this.ctx;
        let y = config.y * this.yScale;
        let x = config.x * this.xScale
        let width = config.width*this.xScale
        let height = config.height * constants.heightScale;
        let color = (config.color? config.color: '#ff2d2d')
        ctx.save();
            ctx.lineJoin = 'round'
            ctx.fillStyle = this.increase_brightness(color,35)+ constants.alpha;
            ctx.strokeStyle = this.increase_brightness(color,25);
            ctx.lineWidth = 3
            ctx.shadowColor = this.increase_brightness('#000000',50)+'59';
            ctx.shadowBlur = 3;
            ctx.shadowOffsetY = 4;
            ctx.shadowOffsetX = -3;
            //ctx.strokeStyle = '#ffffff' + constants.alpha
            ctx.fillRect(x, y,width , height)
            ctx.strokeRect(x, y, width, height)
        ctx.restore();
        if (config.label) {
            this.drawBoxLabel(config);
        }
    }

    drawBoxLabel(config: IBoxConfig){
        let color = (config.color? config.color: '#ff2d2d');
        let ctx = this.ctx;
        let y =  (config.y+(config.height/4))*constants.yScale;
        //console.log('label: ',y)
        let x = ((config.x+ (config.width*.05))) * constants.xScale;
        ctx.save();
            ctx.lineJoin = 'round';
            ctx.fillStyle = this.increase_brightness(color,75);
            ctx.font = 'bolder 13pt Arial '
            ctx.lineJoin = 'round';
            ctx.miterLimit = 2;
            if (config.label) {
                ctx.fillText(config.label, x,y);
                //ctx.strokeText(config.label, x, y);

            }
        ctx.restore();
    }
    updateCanvas(new_canvas:HTMLCanvasElement,callback: () =>void){
        this.clearView(this.canvas.width,this.canvas.height);
        this.canvas = new_canvas;
        this.ctx = <CanvasRenderingContext2D>new_canvas.getContext('2d');
        callback();
    }

    clearView(width: number, height: number){
        let ctx = this.ctx;
        ctx.save();
            ctx.clearRect(0,0,width,height);
        ctx.restore();
    }

    drawBackground(width: number, height: number,color?:string) {
        let ctx = this.ctx
        ctx.save()
            ctx.fillStyle = color? color: 'white';
            ctx.fillRect(0, 0, width, height);
        ctx.restore()
    }

    drawPin(pinconfig: IPinConfig){
        let ctx = this.ctx;
        let x = Math.round(pinconfig.x);
        ctx.save();
            ctx.lineCap = 'round'
            ctx.strokeStyle = pinconfig.color? pinconfig.color:'blue';
            ctx.fillStyle = pinconfig.label_color? pinconfig.label_color: 'black';
            ctx.beginPath();
                ctx.moveTo(x * this.xScale, pinconfig.y1);
                if(pinconfig.label)
                    ctx.fillText(pinconfig.label, pinconfig.x * this.xScale, pinconfig.y1 - 3);
                ctx.lineTo(x * this.xScale, pinconfig.y2);
                ctx.stroke();
            ctx.closePath();
        ctx.restore();
    }



    //code provided by: https://stackoverflow.com/questions/6443990/javascript-calculate-brighter-colour
    increase_brightness(hex:string, percent:number){
        // strip the leading # if it's there
        hex = hex.replace(/^\s*#|\s*$/g, '');
    
        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if(hex.length == 3){
            hex = hex.replace(/(.)/g, '$1$1');
        }
    
        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);
    
        return '#' +
           ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
           ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
           ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
    }

}
