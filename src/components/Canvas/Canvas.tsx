import React, {FC, useRef} from 'react';
import styles from './Canvas.module.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import {useParams} from "react-router-dom"
import axios from "axios";
import MyModal from "../Modal/MyModal";
import useSocket from "../../hooks/useSocket";
import useCanvasPreload from "../../hooks/useCanvasPreload";

const Canvas:FC =  observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const params = useParams();

    const isLoading = useCanvasPreload(canvasRef, params.id!);
    useSocket('ws://localhost:5000/', params.id!, canvasRef);
    const mouseDownHandler = ()=>{
        canvasState.pushToUndo(canvasRef.current?.toDataURL()!);
    };
    const mouseUpHandler=()=>{
        axios.post(`http://localhost:5000/image?id=${params.id}`,{
            img: canvasRef.current?.toDataURL(),
        }).then(response=>{
            console.log(response.data);
        })
    }
    return (
        <div className={styles.canvas}>
            {isLoading ? <div>Is loading...</div>
                :
                <MyModal/>
            }
            <canvas onMouseUp={()=>mouseUpHandler()} onMouseDown={()=>mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;