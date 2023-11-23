import React from "react";

export type CanvasType = {
    stroke: any,
    onmousemove:  React.MouseEventHandler<HTMLCanvasElement>| null,
    onmouseup: React.MouseEventHandler<HTMLCanvasElement>| null,
    onmousedown: React.MouseEventHandler<HTMLCanvasElement>| null,
}