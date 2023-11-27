import {makeAutoObservable} from "mobx";

class CanvasState{
    public canvas:(HTMLCanvasElement | null) = null;

    public undoList:string[]  = [];
    public redoList:string[]  = [];
    constructor() {
        makeAutoObservable(this);
    }

    public setCanvas(canvas: HTMLCanvasElement | null){
        this.canvas = canvas;
    }

    public pushToRedo(data:string){
        this.redoList?.push(data);
    }
    public pushToUndo(data:string){
        this.undoList?.push(data);
    }

    public undo(){
        let ctx = this.canvas?.getContext('2d');
        if(this.undoList.length > 0){
            let dataUrl:string  = this.undoList.pop()!;
            this.pushToRedo(this.canvas?.toDataURL()!);
            let img = new Image();
            img.src = dataUrl;
            img.onload=()=>{
                ctx?.clearRect(0,0,this.canvas?.width!, this.canvas?.height!);
                ctx?.drawImage(img, 0,0,this.canvas?.width!, this.canvas?.height!);
            };
        }else{
            ctx?.clearRect(0,0,this.canvas?.width!, this.canvas?.height!);
        }
    }
    public redo(){
        let ctx = this.canvas?.getContext('2d');
        if(this.redoList.length > 0){
            let dataUrl:string  = this.redoList.pop()!;
            this.pushToUndo(this.canvas?.toDataURL()!);
            let img = new Image();
            img.src = dataUrl;
            img.onload=()=>{
                ctx?.clearRect(0,0,this.canvas?.width!, this.canvas?.height!);
                ctx?.drawImage(img, 0,0,this.canvas?.width!, this.canvas?.height!);
            };
        }
    }

}
export default new CanvasState();