import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import {Eraser} from "../tools/Eraser";
import {RefObject} from "react";

export default function drawHandler(msg:any, canvasRef:RefObject<HTMLCanvasElement>, ctx:CanvasRenderingContext2D){
    const figure = msg.figure;
    switch (figure.type){
        case "Brush":
            Brush.draw(ctx!, figure.x, figure.y, figure.color);
            break;
        case "Rect":
            Rect.staticDraw(ctx!, figure.x, figure.y, figure.width, figure.height, figure.color);
            break;
        case "Eraser":
            Eraser.draw(ctx!, figure.x, figure.y);
            break;
        case "finish":
            ctx!.beginPath();
            break;

    }
}