import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Canvas.module.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import { Button, Modal } from 'antd';
import {useParams} from "react-router-dom"

const Canvas:FC =  observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const params = useParams();
    useEffect(()=>{
        console.log('Use Effect')
        canvasState.setCanvas(canvasRef.current);
        toolState.setTool(new Brush(canvasRef.current!));
    }, [])
    useEffect(()=>{
        if(canvasState.username){
            const socket = new WebSocket('ws://localhost:5000/');
            socket.onopen = ()=>{
                socket.send(JSON.stringify({
                    id:params.id,
                    username:canvasState.username,
                    method:'connection'
                }))
            }
            socket.onmessage=(event:MessageEvent)=>{
                console.log(event.data)
            }
        }
    }, [canvasState.username])
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const mouseDownHandler = ()=>{
        canvasState.pushToUndo(canvasRef.current?.toDataURL()!);
    };
    const connectionHandler = ()=>{
        if(usernameRef.current?.value !== undefined){
            canvasState.setUsername(usernameRef.current.value)
            setIsModalOpen(false);
        }
    }

    return (
        <div className={styles.canvas}>
            <Modal  className={styles.modal} title="Enter your username" open={isModalOpen} onOk={handleOk} closeIcon={false} footer={false}>
                <input ref={usernameRef} className={styles.modal__input} type="text" placeholder={'username'}/>
                <div className={styles.modal__btn}>
                    <Button onClick={()=>connectionHandler()}>Ok</Button>
                </div>
            </Modal>
          <canvas onMouseDown={()=>mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;