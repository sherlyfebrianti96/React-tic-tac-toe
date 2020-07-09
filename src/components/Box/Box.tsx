import React, {Component} from 'react';
import styles from './Box.module.css';
import {BoardType} from "../../types/BoardType";
import {BoxType} from "../../types/BoxType";

class Box extends Component<BoxType, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={styles.Box}>
                X
            </div>
        )
    }
}

export default Box;
