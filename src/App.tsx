import React, {Component, lazy} from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "./components/Board/Board";
import {BoardType} from "./types/BoardType";
import styles from "./components/Board/Board.module.css";

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        const player1 = {
            name: 'X'
        };
        const player2 = {
            name: 'O'
        };
        const boardSize: number = 5;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <h1>Tic Tac Toe</h1>
                <p>Let's have fun !!</p>
                <p>O won : 100 times</p>
                <p>X won : 100 times</p>
                <Board size={boardSize}/>
            </div>
        );
    }
}

export default App;
