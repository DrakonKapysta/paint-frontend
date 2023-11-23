import {makeAutoObservable} from "mobx";

class CanvasState{
    public canvas:(HTMLCanvasElement | null) = null;
    constructor() {
        makeAutoObservable(this);
    }

    public setCanvas(canvas: HTMLCanvasElement | null){
        this.canvas = canvas;
    }

}
export default new CanvasState();