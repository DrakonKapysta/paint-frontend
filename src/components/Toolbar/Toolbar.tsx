import React, {FC} from 'react';
import styles from "./Toolbar.module.scss";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import canvasState from "../../store/canvasState";
import Rect from "../../tools/Rect";
import {observer} from "mobx-react-lite";
import {Eraser} from "../../tools/Eraser";
import Circle from "../../tools/Circle";
import Line from "../../tools/Line";
const Toolbar:FC = observer (() => {
    console.log("render tools")

    const changeColor=(e:any)=>{
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    }

    const download = ()=>{
        const dataURL = canvasState.canvas?.toDataURL();
        if(dataURL){
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = canvasState.sessionId + '.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    return (
        <div className={styles.toolbar}>
            <div className={`${styles.toolbar__btn} ${styles.brush}`}
                 onClick={()=>toolState.setTool(new Brush(canvasState.canvas!, canvasState.socket!, canvasState.sessionId))}></div>
            <div className={`${styles.toolbar__btn} ${styles.rect}`}
                 onClick={()=>toolState.setTool(new Rect(canvasState.canvas!,canvasState.socket!, canvasState.sessionId))}></div>
            <div className={`${styles.toolbar__btn} ${styles.circle}`}
                 onClick={()=>toolState.setTool(new Circle(canvasState.canvas!,canvasState.socket!, canvasState.sessionId))} ></div>
            <div className={`${styles.toolbar__btn} ${styles.eraser}`}
                 onClick={()=>toolState.setTool(new Eraser(canvasState.canvas!,canvasState.socket!, canvasState.sessionId))}></div>
            <div className={`${styles.toolbar__btn} ${styles.line}`}
                 onClick={()=>toolState.setTool(new Line(canvasState.canvas!,canvasState.socket!, canvasState.sessionId))}></div>
            <input onChange={e=>changeColor(e)} className={styles.colors} type={'color'}/>
            <div className={`${styles.toolbar__btn} ${styles.undo}`} onClick={(e)=>canvasState.undo()}></div>
            <div className={`${styles.toolbar__btn} ${styles.redo}`} onClick={(e)=>canvasState.redo()}></div>
            <div className={`${styles.toolbar__btn} ${styles.save}`} onClick={()=>download()}></div>
        </div>
    );
});

export default Toolbar;