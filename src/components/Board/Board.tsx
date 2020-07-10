import React, {Component} from 'react';
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
        console.log('selectedFieldArr before sort : ', selectedFieldArr);
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

        return this.checkWin(field.length, selectedFieldArr, countX, countY, diagonalX, diagonalY);
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

    checkCrossedDiagonal(fieldLength: number, selectedFieldArr: any, reqDiagonal: any) {
        let count = 0;
        selectedFieldArr.filter((field: Array<any>) => {
                const reqCheck = (element: any) => this.isSameArray(element, field);
                if (reqDiagonal.some(reqCheck)) {
                    count++;
                }
            });
        return (count === fieldLength);
    }

    checkWin(fieldLength: number, selectedFieldArr: any, countX: number, countY: number, diagonalX: Array<number>, diagonalY: Array<number>) {
        const winHorizontal = (countX === this.props.size);
        const winVertical = (countY === this.props.size);

        const indexList = new Array(fieldLength).fill(0).map((item, i) => item + i);

        const reqDiagonalLeft = indexList.map((idx) => [idx, idx]);
        const winDiagonalLeft = this.checkCrossedDiagonal(fieldLength, selectedFieldArr, reqDiagonalLeft);


        const reqDiagonalRight = indexList.map((idx, index) => {
            const reversedIdx = (indexList.length - 1) - idx;
            return [idx, reversedIdx]
        });
        const winDiagonalRight = this.checkCrossedDiagonal(fieldLength, selectedFieldArr, reqDiagonalRight);

        return winHorizontal || winVertical || winDiagonalLeft || winDiagonalRight;
    }

    announceWinner(player: string) {
        // this will be change to Announcement Board
        setTimeout(
            function() {
                alert('Player ' + player + ' won this game!')
            }
                .bind(this),
            100
        );
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
            // const players = [PlayerEnum.playerOne, PlayerEnum.playerTwo];
            const players = [PlayerEnum.playerOne];
            players.forEach((player) => {
                const indexesOfPlayer = this.getIndexOfBoxes(field, player);
                const checkingVerticalPlayer = this.checkingVerticalAndHorizontalAndDiagonal(field, indexesOfPlayer, selectedIndex);

                if (checkingVerticalPlayer) {
                    this.announceWinner(player);
                }
            });
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
