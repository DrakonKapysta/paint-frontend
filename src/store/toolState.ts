import {makeAutoObservable} from "mobx";
import Tool from "../tools/Tool";

class ToolState{
    public tool:Tool | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool:any){
        this.tool = tool;
    }
    setFillColor(color:string | CanvasPattern | CanvasGradient | undefined){
        this.tool!.fillColor = color;
    }
    setStrokeColor(color:string | CanvasPattern | CanvasGradient | undefined){
        this.tool!.strokeColor = color;
    }
    setWidthLine(width:number){
        this.tool!.lineWidth = width;
    }
}
export default new ToolState();