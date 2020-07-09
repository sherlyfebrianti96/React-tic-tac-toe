import React, {Component} from 'react';
import styles from './Box.module.css';
import {BoxType} from "../../types/BoxType";

class Box extends Component<BoxType, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div key={this.props.content} className={styles.Box}>
                {this.props.content}
            </div>
        )
    }
}

export default Box;
