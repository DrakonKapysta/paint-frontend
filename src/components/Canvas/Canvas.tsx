import React, {FC, useEffect, useRef} from 'react';
import styles from './Canvas.module.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
const Canvas:FC =  observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        console.log('Use Effect')
        canvasState.setCanvas(canvasRef.current);
        toolState.setTool(new Brush(canvasRef.current!));
    }, [])

    const mouseDownHandler = ()=>{
        canvasState.pushToUndo(canvasRef.current?.toDataURL()!);
    };

    return (
        <div className={styles.canvas}>
          <canvas onMouseDown={()=>mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;