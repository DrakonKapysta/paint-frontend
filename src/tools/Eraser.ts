import Brush from "./Brush";

export class Eraser extends Brush{
    constructor(canvas:HTMLCanvasElement, socket:WebSocket, id:string) {
        super(canvas, socket, id);
    }
    public mouseMoveHandler(e:MouseEvent){

        if(this.mouseDown && e.target instanceof HTMLCanvasElement){
            this.socket.send(JSON.stringify({
                method:"draw",
                id: this.sessionId,
                figure:{
                    type:"Eraser",
                    color:this.ctx?.strokeStyle,
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                }
            }))
        }
    }

    public static draw(ctx:CanvasRenderingContext2D, x:number, y:number){
        ctx.strokeStyle = "white";
        ctx?.lineTo(x,y);
        ctx?.stroke();
    }
}