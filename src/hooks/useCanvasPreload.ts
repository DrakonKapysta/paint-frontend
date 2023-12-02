import {RefObject, useEffect, useState} from "react";
import canvasState from "../store/canvasState";
import axios from "axios";

const useCanvasPreload = (canvasRef:RefObject<HTMLCanvasElement>,id:string )=>{
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        console.log('usePreload')
        canvasState.setCanvas(canvasRef.current);
        setIsLoading(true);
        axios.get(`http://localhost:5000/image?id=${id}`)
            .then(response=>{
                if(response.data ==="empty"){
                    return
                }
                const img = new Image();
                setIsLoading(false);
                const ctx = canvasRef.current?.getContext('2d');
                img.src = response.data;
                img.onload = ()=>{
                    ctx?.clearRect(0,0,canvasRef.current?.width!,canvasRef.current?.height!);
                    ctx?.drawImage(img, 0,0,canvasRef.current?.width!, canvasRef.current?.height!);
                }
            }).catch(error=>{
            console.log(error);
        });
    },[]);
    return isLoading;
}
export default useCanvasPreload;