import React, {FC} from 'react';
import styles from "./Toolbar.module.scss";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import canvasState from "../../store/canvasState";
import Rect from "../../tools/Rect";
import {observer} from "mobx-react-lite";
import {Eraser} from "../../tools/Eraser";
const Toolbar:FC = observer (() => {
    console.log("render tools")

    const changeColor=(e:any)=>{
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    }

    return (
        <div className={styles.toolbar}>
            <div className={`${styles.toolbar__btn} ${styles.brush}`} onClick={()=>toolState.setTool(new Brush(canvasState.canvas!))}></div>
            <div className={`${styles.toolbar__btn} ${styles.rect}`} onClick={()=>toolState.setTool(new Rect(canvasState.canvas!))}></div>
            <div className={`${styles.toolbar__btn} ${styles.circle}`} ></div>
            <div className={`${styles.toolbar__btn} ${styles.eraser}`} onClick={()=>toolState.setTool(new Eraser(canvasState.canvas!))}></div>
            <div className={`${styles.toolbar__btn} ${styles.line}`}></div>
            <input onChange={e=>changeColor(e)} className={styles.colors} type={'color'}/>
            <div className={`${styles.toolbar__btn} ${styles.undo}`}></div>
            <div className={`${styles.toolbar__btn} ${styles.redo}`}></div>
            <div className={`${styles.toolbar__btn} ${styles.save}`}></div>
        </div>
    );
});

export default Toolbar;