import Rect from "./Rect";

export default class Line extends Rect{
    public mouseMoveHandler(e:MouseEvent){
        if(this.mouseDown && e.target instanceof HTMLCanvasElement){
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.draw(currentX , currentY);
        }
    }
    public draw(x:number, y:number){
        const img = new Image();
        img.src = this.saved;
        img.onload = ()=>{
            this.ctx?.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx?.drawImage(img, 0,0,this.canvas.width, this.canvas.height);
            this.ctx?.beginPath();
            this.ctx?.moveTo(this.startX, this.startY);
            this.ctx?.lineTo(x,y);
            this.ctx?.stroke();
        }
    }

}