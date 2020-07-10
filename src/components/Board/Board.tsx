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
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[i][j] === player) {
                    result.push([i, j]);
                }
            }
        }
        return result;
    }

    checkingVerticalAndHorizontalAndDiagonal(field: string[][], selectedFieldArr: any, selectedIndex: any) {
        console.log('before selectedFieldArr after sort : ', selectedFieldArr);
        selectedFieldArr.sort(function (a: any, b: any) {
            return a[0] - b[0]
        });
        console.log('selectedFieldArr after sort : ', selectedFieldArr);
        let countX = 0;
        let countY = 0;
        const diagonalX = [];
        const diagonalY = [];
        const y = selectedIndex[0];
        const x = selectedIndex[1];
        for (let i = 0; i < selectedFieldArr.length; i++) {
            for (let j = 1; j < selectedFieldArr[i].length; j++) {
                const horizontalValue = selectedFieldArr[i][j - 1];
                const verticalValue = selectedFieldArr[i][j];
                console.log('horizontalValue : ', horizontalValue);
                console.log('verticalValue : ', verticalValue);
                if (horizontalValue === x) {
                    countX++;
                }
                if (verticalValue === y) {
                    countY++;
                }
                diagonalX.push(horizontalValue);
                diagonalY.push(verticalValue);
            }
        }

        return this.checkWin(field.length, countX, countY, diagonalX, diagonalY);
    }

    isSameArray(arr1: Array<any>, arr2: Array<any>) {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for(let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true
    }

    checkWin(fieldLength: number, countX: number, countY: number, diagonalX: Array<number>, diagonalY: Array<number>) {
        const winHorizontal = (countX === this.props.size);
        const winVertical = (countY === this.props.size);

        const indexList = new Array(fieldLength).fill(0).map((item, i) => item + i);
        const crossLeftX = this.isSameArray(indexList, diagonalX);
        const crossLeftY = this.isSameArray(indexList, diagonalY);
        const winDiagonalLeft = (crossLeftX && crossLeftY);


        return winHorizontal || winVertical || winDiagonalLeft;
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
            const checkingVerticalPlayerOne = this.checkingVerticalAndHorizontalAndDiagonal(field, indexesOfPlayerOne, selectedIndex);
            const checkingVerticalPlayerTwo = this.checkingVerticalAndHorizontalAndDiagonal(field, indexesOfPlayerTwo, selectedIndex);

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
