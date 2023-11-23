import Tool from "./Tool";

export default class Brush extends Tool{
    private mouseDown: boolean = false;
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
        if (e.target instanceof HTMLCanvasElement) {
            this.ctx?.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }
    public mouseMoveHandler(e:MouseEvent){
        if(this.mouseDown && e.target instanceof HTMLCanvasElement){
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }
    public draw(x:number, y:number){
        this.ctx?.lineTo(x,y);
        this.ctx?.stroke();
    }

}