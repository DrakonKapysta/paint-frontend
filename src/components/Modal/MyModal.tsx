import React, {FC, useRef, useState} from 'react';
import styles from "../Canvas/Canvas.module.scss";
import {Button, Modal} from "antd";
import canvasState from "../../store/canvasState";


const MyModal:FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const usernameRef = useRef<HTMLInputElement>(null);
    const connectionHandler = ()=>{
        if (usernameRef.current?.value !== undefined) {
            canvasState.setUsername(usernameRef.current.value)
            setIsModalOpen(false);
        }
    }
    return (
        <Modal  className={styles.modal} title="Enter your username" open={isModalOpen} closeIcon={false} footer={false}>
            <input ref={usernameRef} className={styles.modal__input} type="text" placeholder={'username'}/>
            <div className={styles.modal__btn}>
                <Button onClick={()=>connectionHandler()}>Ok</Button>
            </div>
        </Modal>
    );
};

export default MyModal;