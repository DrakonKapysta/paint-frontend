import React, {FC} from 'react';
import styles from './PaintPage.module.scss';
import Toolbar from "../Toolbar/Toolbar";
import SettingBar from "../SettingBar/SettingBar";
import Canvas from "../Canvas/Canvas";
const PaintPage:FC = () => {
    return (
        <div className={styles.wrapper}>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </div>
    );
};

export default PaintPage;