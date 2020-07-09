import React, {Component} from 'react';
import styles from './Board.module.css';
import Box from "../Box/Box";
import {BoardType} from "../../types/BoardType";

class Board extends Component<BoardType, {}> {
    constructor(props: any) {
        super(props);
    }

    initBoxSize(): string[] {
        const boxes = new Array();

        for (let i = 0; i < this.props.size; i++) {
            boxes.push('');
        }

        return boxes;
    }

    initiateField(): string[][] {
        const boxes = new Array();
        for (let i = 0; i < this.props.size; i++) {
            boxes.push(this.initBoxSize());
        }

        return boxes;
    }

    render() {
        const field = this.initiateField();

        return (
            <div className={styles.Board}>
                {field.map(function (boxes, index) {
                    console.log('BOX LOHHH : ', boxes);
                    const rows = boxes.map((box, index) => {
                        return <Box content={box}/>
                    });

                    rows.push(<div className={styles.clearFix}/>);

                    return rows;
                })}
            </div>
        )
    }
};

export default Board;
