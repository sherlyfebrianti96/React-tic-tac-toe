import React, {Component, useState} from 'react';
import styles from './Board.module.css';
import Box from "../Box/Box";
import {BoardType} from "../../types/BoardType";
import {PlayerEnum} from "../../stories/PlayerEnum";

class Board extends Component<BoardType, {}> {
    constructor(props: any) {
        super(props);
    }

    getIndexOfBoxes(arr: any, player: any) {
        const result = new Array();
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[i][j] === player) {
                    result.push([i, j]);
                }
            }
        }
        return result;
    }

    checkingVerticalAndHorizontal(arr: any, selectedIndex: any) {
        let countX = 0;
        let countY = 0;
        const y = selectedIndex[0];
        const x = selectedIndex[1];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 1; j < arr[i].length; j++) {
                if (arr[i][j-1] === x) {
                    countX++;
                }
                if (arr[i][j] === y) {
                    countY++;
                }
            }
        }

        return this.checkWin(countX, countY);
    }

    checkWin(countX: number, countY: number) {
        return (countX === this.props.size) || (countY === this.props.size);
    }

    announceWinner(player: string) {
        // this will be change to Announcement Board
        alert('Player ' + player + ' won this game!');
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
            return (currentPlayer.length > 0) ? currentPlayer[currentPlayer.length - 1] : PlayerEnum.playerTwo;
        };
        const boxClicked: any = (y: number, x: number) => {
            if (field[y][x] !== '') {
                alert('Already selected. Please select another boxes.');
            } else {
                const lastPlayer: string = getLastPlayer();
                currentPlayer.push(getCurrentPlayer(lastPlayer));
                field[y][x] = getLastPlayer();
                calculateWinner([x, y]);
            }

            this.setState((state, props) => {
                return {field: props, currentPlayer: props};
            });
        };

        const calculateWinner = (selectedIndex: any) => {
            const indexesOfPlayerOne = this.getIndexOfBoxes(field, PlayerEnum.playerOne);
            const indexesOfPlayerTwo = this.getIndexOfBoxes(field, PlayerEnum.playerTwo);
            const checkingVerticalPlayerOne = this.checkingVerticalAndHorizontal(indexesOfPlayerOne, selectedIndex);
            const checkingVerticalPlayerTwo = this.checkingVerticalAndHorizontal(indexesOfPlayerTwo, selectedIndex);

            if (checkingVerticalPlayerOne) {
                this.announceWinner(PlayerEnum.playerOne);
            }
            if (checkingVerticalPlayerTwo) {
                this.announceWinner(PlayerEnum.playerTwo);
            }
        };

        return (
            <div className={styles.Board}>
                {field.map(function (boxes, indexY) {
                    const rows = boxes.map(function (box, indexX) {
                        const key = 'box-' + indexY + '-' + indexX;
                        const clickingTheBox = () => {
                            boxClicked(indexY, indexX);
                        };

                        return (
                            <span key={key} onClickCapture={clickingTheBox}>
                                <Box content={box}/>
                            </span>
                        );
                    });
                    const key = 'row-' + indexY;
                    rows.push(<div key={key} className={styles.clearFix}/>);

                    return rows;
                })}
            </div>
        )
    }
}

export default Board;
