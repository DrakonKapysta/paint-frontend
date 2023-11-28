import Rect from "./Rect";

export default class Circle extends Rect{
    constructor(canvas:HTMLCanvasElement, socket:WebSocket, id:string) {
        super(canvas, socket, id);
    }
    public mouseMoveHandler(e:MouseEvent){
        if(this.mouseDown && e.target instanceof HTMLCanvasElement){
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let radius = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX, this.startY, radius,height);
        }
    }
    public draw(x:number, y:number, r:number, h:number){
        const img = new Image();
        if(r<0){
            r=~r+1;
        }
        img.src = this.saved;
        img.onload = ()=>{
            this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx?.drawImage(img, 0,0,this.canvas.width, this.canvas.height);
            this.ctx?.beginPath();
            this.ctx?.ellipse(this.startX, this.startY, r, r, 0, 0, 2* Math.PI);
            this.ctx?.stroke();
        }
    }

}