import React, {FC} from 'react';
import styles from './PaintPage.module.scss';
import Toolbar from "../Toolbar/Toolbar";
import SettingBar from "../SettingBar/SettingBar";
import Canvas from "../Canvas/Canvas";
import {observer} from "mobx-react-lite";
const PaintPage:FC = observer(() => {
    console.log("Render paing page")
    return (
        <div className={styles.wrapper}>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </div>
    );
});

export default PaintPage;