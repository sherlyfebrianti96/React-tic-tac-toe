import React, {Component} from 'react';
import styles from './Board.module.css';
import Box from "../Box/Box";
import {BoardType} from "../../types/BoardType";

class Board extends Component<BoardType, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const field = this.props.field;
        const playerSelectBox = () => {
            field[0][0] = 'X';
        };
        const boxClicked: any = (x: number, y: number) => {
            if (field[x][y] !== '') {
                alert('Already selected. Please select another boxes.');
            } else {
                field[x][y] = 'X';
            }

            this.setState((state, props) => {
                return {field: props};
            });
        };

        return (
            <div className={styles.Board}>
                {field.map(function (boxes, indexX) {
                    const rows = boxes.map((box, indexY) => {
                        const key = 'box-' + indexX + '-' + indexY;
                        const clickingTheBox = () => {
                            boxClicked(indexX, indexY)
                        };

                        return (
                            <span key={key} onClick={clickingTheBox}>
                                <Box content={box} playerSelectBox={playerSelectBox}/>
                            </span>
                        );
                    });
                    const key = 'row-' + indexX;
                    rows.push(<div key={key} className={styles.clearFix}/>);

                    return rows;
                })}
            </div>
        )
    }
}

export default Board;
