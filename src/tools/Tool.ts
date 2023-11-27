export default class Tool{
    public canvas:HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D | null = null
    constructor(canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.destroyEvents();
    }

    public set fillColor(color:string | CanvasPattern | CanvasGradient | undefined){
        if(color){
            this.ctx!.fillStyle = color;
        }
    }
    public set strokeColor(color:string | CanvasPattern | CanvasGradient | undefined){
        if(color){
            this.ctx!.strokeStyle = color;
        }
    }
    public set lineWidth(width:number){
        this.ctx!.lineWidth = width;
    }

    private destroyEvents(){
        this.canvas.onmousemove = null;
        this.canvas.onmouseup = null;
        this.canvas.onmousedown = null;

    }

    public getMouseCoordinates(e: MouseEvent){
        return {
            x: e.pageX - (e.target as HTMLElement).offsetLeft,
            y: e.pageY - (e.target as HTMLElement).offsetTop
        }
    }
}
