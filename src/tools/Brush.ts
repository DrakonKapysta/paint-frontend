import Tool from "./Tool";

export default class Brush extends Tool{
    private mouseDown: boolean = false;
    constructor(canvas:HTMLCanvasElement, socket:WebSocket, id: string) {
        super(canvas, socket, id);
        this.listen();
    }
    public listen(){
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }
    public mouseUpHandler(e:MouseEvent){
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method:"draw",
            id: this.sessionId,
            figure:{
                type:"finish",
            }
        }))
    }
    public mouseDownHandler(e:MouseEvent){
        this.mouseDown = true;
        this.ctx?.beginPath();
        if (e.target instanceof HTMLCanvasElement) {
            this.ctx?.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }
    public mouseMoveHandler(e:MouseEvent){
        if(this.mouseDown && e.target instanceof HTMLCanvasElement){
            this.socket.send(JSON.stringify({
                method:"draw",
                id: this.sessionId,
                figure:{
                    type:"Brush",
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                }
            }))
        }
    }
    public static draw(ctx:CanvasRenderingContext2D, x:number, y:number){
        ctx?.lineTo(x,y);
        ctx?.stroke();
    }
}