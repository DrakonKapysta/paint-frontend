import Tool from "./Tool";

export default class Rect extends Tool{
    public mouseDown: boolean = false;
    public startX:number = 0;
    public startY:number = 0;
    public saved:string = '';
    public width: number = 0;
    public height: number = 0;
    constructor(canvas:HTMLCanvasElement, socket:WebSocket, id:string) {
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
                type:"Rect",
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                color: this.ctx?.fillStyle
            }
        }))
    }
    public mouseDownHandler(e:MouseEvent){
        this.mouseDown = true;
        this.ctx?.beginPath();
        if(this.mouseDown && e.target instanceof HTMLCanvasElement){
            this.startX = e.pageX - e.target.offsetLeft;
            this.startY = e.pageY - e.target.offsetTop;
            this.saved = this.canvas.toDataURL();
        }
    }
    public mouseMoveHandler(e:MouseEvent){
        if(this.mouseDown && e.target instanceof HTMLCanvasElement){
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, this.width,this.height, );
        }
    }
    public draw(x:number, y:number, w:number, h:number){
        const img = new Image();
        img.src = this.saved;
        img.onload = ()=>{
            this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx?.drawImage(img, 0,0,this.canvas.width, this.canvas.height);
            this.ctx?.beginPath();
            this.ctx?.rect(x,y,w,h);
            this.ctx?.fill();
            this.ctx?.stroke();
        }
    }

    public static staticDraw(ctx:CanvasRenderingContext2D, x:number,y:number,w:number,h:number, color:string){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.fill();
        ctx.stroke();
    }

}