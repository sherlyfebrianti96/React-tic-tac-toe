import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "./components/Board/Board";

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    initBoxSize(size: number): string[] {
        return new Array(size).fill('').map(() => '');
    }

    initiateField(size: number): string[][] {
        return new Array(size).fill([]).map(() => this.initBoxSize(size));
    }

    render() {
        const boardSize: number = 5;
        const currentPlayer: any = new Array<String>();

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <h1>Tic Tac Toe</h1>
                <p>Let's have fun !!</p>
                <p>Current board size : {boardSize}</p>
                {/*<p>O won : 100 times</p>*/}
                {/*<p>X won : 100 times</p>*/}
                <Board size={boardSize} field={this.initiateField(boardSize)} currentPlayer={currentPlayer} />
            </div>
        );
    }
}

export default App;
