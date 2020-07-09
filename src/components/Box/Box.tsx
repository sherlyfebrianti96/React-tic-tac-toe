import React, {Component} from 'react';
import styles from './Box.module.css';
import {BoardType} from "../../types/BoardType";
import {BoxType} from "../../types/BoxType";

class Box extends Component<BoxType, {}> {
    constructor(props: any) {
        super(props);

        this.boxClicked = this.boxClicked.bind(this);
    }

    boxClicked(event: any) {
        console.log('event : ', event);
        if (this.props.content !== '') {
            alert('Already selected. Please select another boxes.');
        }
    }

    render() {
        return (
            <div className={styles.Box} onClick={this.boxClicked}>
                {this.props.content}
            </div>
        )
    }
}

export default Box;
