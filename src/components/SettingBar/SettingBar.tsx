import React, {FC} from 'react';
import styles from './SettingBar.module.scss'
import toolState from "../../store/toolState";
const SettingBar:FC = () => {
    return (
        <div className={styles.settingBar}>
            <label htmlFor="line-width">Товщина лінії</label>
            <input
                onChange={(e)=>toolState.setWidthLine(parseInt(e.target.value))}
                className={styles.lineWidth}
                id='line-width'
                type="number"
                defaultValue={1} min={1} max={50} />
            <label htmlFor="stroke-color">Колір обводки</label>
            <input
                onChange={(e)=>toolState.setStrokeColor(e.target.value)}
                className={styles.lineWidth}
                id='stroke-color'
                type="color"
            />
        </div>
    );
};

export default SettingBar;