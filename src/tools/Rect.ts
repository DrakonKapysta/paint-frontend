import Tool from "./Tool";

export default class Rect extends Tool{
    private mouseDown: boolean = false;
    private startX:number = 0;
    private startY:number = 0;
    private saved:string = '';
    constructor(canvas:HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }
    public listen(){
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }
    public mouseUpHandler(e:MouseEvent){
        this.mouseDown = false;
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
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX, this.startY, width,height);
        }
    }
    private draw(x:number, y:number, w:number, h:number){
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

}