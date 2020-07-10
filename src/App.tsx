import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "./components/Board/Board";

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    initBoxSize(size: number): string[] {
        const boxes = [];

        for (let i = 0; i < size; i++) {
            boxes.push('');
        }

        return boxes;
    }

    initiateField(size: number): string[][] {
        const boxes = [];
        for (let i = 0; i < size; i++) {
            boxes.push(this.initBoxSize(size));
        }

        return boxes;
    }

    render() {
        const boardSize: number = 5;
        const currentPlayer: Array<String> = new Array<String>();

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <h1>Tic Tac Toe</h1>
                <p>Let's have fun !!</p>
                <p>O won : 100 times</p>
                <p>X won : 100 times</p>
                <Board size={boardSize} field={this.initiateField(boardSize)} currentPlayer={currentPlayer} />
            </div>
        );
    }
}

export default App;
