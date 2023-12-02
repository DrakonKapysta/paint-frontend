import {RefObject, useEffect} from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import drawHandler from "../features/drawHandler";

const useSocket = (url:string, id:string, canvasRef:RefObject<HTMLCanvasElement>)=>{
    useEffect(()=>{
        console.log('useSocket');
        if(canvasState.username){
            const socket = new WebSocket(url);
            const ctx = canvasRef.current?.getContext('2d');
            canvasState.setSocket(socket);
            canvasState.setSessionId(id);
            toolState.setTool(new Brush(canvasRef.current!, socket, id));
            socket.onopen = ()=>{
                socket.send(JSON.stringify({
                    id:id,
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
                        drawHandler(msg, canvasRef,ctx!);
                        break
                }

            }
        }
    },[canvasState.username])
}
export default useSocket;