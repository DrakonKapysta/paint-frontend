import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Canvas.module.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Brush from "../../tools/Brush";
import { Button, Modal } from 'antd';
import {useParams} from "react-router-dom"
import Rect from "../../tools/Rect";
import axios from "axios";

const Canvas:FC =  observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const params = useParams();
    useEffect(()=>{
        console.log('Use Effect')
        canvasState.setCanvas(canvasRef.current);
        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(response=>{
                const img = new Image();
                const ctx = canvasRef.current?.getContext('2d');
                img.src = response.data;
                img.onload = ()=>{
                    ctx?.clearRect(0,0,canvasRef.current?.width!,canvasRef.current?.height!);
                    ctx?.drawImage(img, 0,0,canvasRef.current?.width!, canvasRef.current?.height!);
                }
            });
    }, [])
    useEffect(()=>{
        if(canvasState.username){
            const socket = new WebSocket('ws://localhost:5000/');
            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id!);
            toolState.setTool(new Brush(canvasRef.current!, socket, params.id!));
            socket.onopen = ()=>{
                socket.send(JSON.stringify({
                    id:params.id,
                    username:canvasState.username,
                    method:'connection'
                }))
            }
            socket.onmessage=(event:MessageEvent)=>{
                let msg = JSON.parse(event.data);
                switch (msg.method){
                    case "connection":
                        console.log(`Користувач ${msg.username} підключився.`)
                        break
                    case "draw":
                        drawHandler(msg);
                        break
                }

            }
        }
    }, [canvasState.username])
    const drawHandler = (msg:any)=>{
        const figure = msg.figure;
        const ctx = canvasRef.current?.getContext('2d');
        switch (figure.type){
            case "Brush":
                Brush.draw(ctx!, figure.x, figure.y);
                break;
            case "Rect":
                Rect.staticDraw(ctx!, figure.x, figure.y, figure.width, figure.height, figure.color);
                ctx!.beginPath();
                break;
            case "finish":
                ctx!.beginPath();
                break;

        }
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
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
          <canvas onMouseUp={()=>mouseUpHandler()} onMouseDown={()=>mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;