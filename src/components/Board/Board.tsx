import React, {Component, useState} from 'react';
import styles from './Board.module.css';
import Box from "../Box/Box";
import {BoardType} from "../../types/BoardType";
import {PlayerEnum} from "../../stories/PlayerEnum";

class Board extends Component<BoardType, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const field = this.props.field;
        const currentPlayer: Array<String> = this.props.currentPlayer;
        const getCurrentPlayer = (oldPlayer: string) => {
            if (oldPlayer === PlayerEnum.playerOne) {
                return PlayerEnum.playerTwo;
            } else {
                return PlayerEnum.playerOne;
            }
        };

        const getLastPlayer: any = () => {
            return (currentPlayer.length > 0) ? currentPlayer[currentPlayer.length - 1] : PlayerEnum.playerOne;
        };
        const boxClicked: any = (x: number, y: number) => {
            if (field[x][y] !== '') {
                alert('Already selected. Please select another boxes.');
            } else {
                const lastPlayer: string = getLastPlayer();
                currentPlayer.push(getCurrentPlayer(lastPlayer));
                field[x][y] = getLastPlayer();
            }

            this.setState((state, props) => {
                return {field: props, currentPlayer: props};
            });
        };

        return (
            <div className={styles.Board}>
                {field.map(function (boxes, indexX) {
                    const rows = boxes.map(function (box, indexY) {
                        const key = 'box-' + indexX + '-' + indexY;
                        const clickingTheBox = () => {
                            boxClicked(indexX, indexY);
                        };

                        return (
                            <span key={key} onClick={clickingTheBox}>
                                <Box content={box}/>
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
