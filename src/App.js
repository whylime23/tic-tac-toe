import React, { Component } from 'react';

import './App.css';

const winCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [7, 5, 3]
];

class App extends Component {
  state = {
    hideInitialModal: false,
    hideWinModal: true,
    gameWon: false,
    user: '',
    computer: '',
    currentPlayer: '',
    moves: 0,
    playerWins: 0,
    computerWins: 0,
    board: {
      1: {
        clickable: true,
        value: '',
        win: false
      },
      2: {
        clickable: true,
        value: '',
        win: false
      },
      3: {
        clickable: true,
        value: '',
        win: false
      },
      4: {
        clickable: true,
        value: '',
        win: false
      },
      5: {
        clickable: true,
        value: '',
        win: false
      },
      6: {
        clickable: true,
        value: '',
        win: false
      },
      7: {
        clickable: true,
        value: '',
        win: false
      },
      8: {
        clickable: true,
        value: '',
        win: false
      },
      9: {
        clickable: true,
        value: '',
        win: false
      },
    }
  }

  computerTurn = () => {
    const { board, moves, gameWon } = this.state;

    if (moves > 8 || gameWon) {
      return;
    }

    let randomNo;
    do {
      randomNo = Math.floor(Math.random() * (9) + 1);
    } while (board[randomNo].clickable === false)

    board[randomNo].clickable = false;
    board[randomNo].value =  this.state.computer;
    setTimeout(() => {
      this.setState({
        currentPlayer: 'user',
        moves: this.state.moves + 1,
        board: board,
      }, this.checkWin);
    }, 500);
  }

  checkWin = () => {
    let winComboTrue;

    const isWinner = winCombos.some((combination) => {
      let winning = true;
      const symbol = this.state.board[combination[0]].value;

      if (!symbol) {
        return false;
      }

      for (var i = 1; i < combination.length; i++) {
        if (this.state.board[combination[i]].value !== symbol) {
          return false;
        }
      }
      winComboTrue = combination;
      return true;
    });

    if (isWinner) {
      const winningModal = () => {
        this.setState ({
          hideWinModal: false
        });
      }

      this.setState({
        gameWon: true
       /* highlight boxes*/
     }, () => setTimeout(winningModal, 500));

    }
  }

  createClass = (boxNo) => {
    return this.state.board[boxNo].win ? 'box-win' : '';
  }

  handleX = ()  => {
    this.setState({
      hideInitialModal: true,
      user: 'X',
      computer: 'O',
      currentPlayer: 'user'
    });
  }

  handleO = () => {
    this.setState({
      hideInitialModal: true,
      user: 'O',
      computer: 'X',
      currentPlayer: 'user'
    });
  }

  handleReset = () => {
    const { board } = this.state;
    for (var key in board) {
      board[key].value = '';
      board[key].clickable = true;
    }

    this.setState({
      hideInitialModal: false,
      user: '',
      computer: '',
      currentPlayer: '',
      moves: 0,
      board: board,
    });
  }

  handleClick = (boxNo) => {
    const { board } = this.state;
    board[boxNo].clickable = false;
    board[boxNo].value =  this.state.user;

    const checkWinAndStartCompTurn = () => {
      this.checkWin();
      this.computerTurn();
    }

    this.setState({
      currentPlayer: 'computer',
      moves: this.state.moves + 1,
      board: board,
    }, checkWinAndStartCompTurn);
  }

  render() {
    return (
      <div className='App'>

        <div className='Frame'>

          <div className={`Modal Chalkboard gradient ${this.state.hideInitialModal ? 'modal-hidden' : ''}`}>
            <div className='Heading'>Tic Tac Toe</div>
            <div className='Game'>
              <div className='Choice'>
                <div>Play as:</div>
                <div className='XO-buttons'>
                  <button className='XO' onClick={this.handleX}>X</button>
                  <button className='XO' onClick={this.handleO}>O</button>
                </div>
              </div>
            </div>
          </div>

          <div className={`Modal Chalkboard gradient ${this.state.hideWinModal ? 'modal-hidden' : ''}`}>
            <div className='Heading'>Tic Tac Toe</div>
            <div className='Game'>
              <h1> {this.state.currentPlayer === 'user' ? 'You have won!' : 'The Computer has won!'} </h1>
            </div>
          </div>

          <div className='Chalkboard gradient'>
            <div className='Heading'>Tic Tac Toe</div>

            <div className='Game'>
              <div className='Row'>
                <div className='Box border-right border-bottom'>
                  <button className='Move 1' disabled={!this.state.board[1].clickable} onClick={() => this.handleClick('1')}>{this.state.board['1'].value}</button>
                </div>
                <div className='Box border-bottom'>
                  <button className='Move 2' disabled={!this.state.board[2].clickable} onClick={() => this.handleClick('2')}>{this.state.board['2'].value}</button>
                </div>
                <div className='Box border-left border-bottom'>
                  <button className='Move 3' disabled={!this.state.board[3].clickable} onClick={() => this.handleClick('3')}>{this.state.board['3'].value}</button>
                </div>
              </div>
              <div className='Row'>
                <div className='Box border-right'>
                  <button className='Move 4' disabled={!this.state.board[4].clickable} onClick={() => this.handleClick('4')}>{this.state.board['4'].value}</button>
                </div>
                <div className='Box'>
                  <button className='Move 5' disabled={!this.state.board[5].clickable} onClick={() => this.handleClick('5')}>{this.state.board['5'].value}</button>
                </div>
                <div className='Box border-left'>
                  <button className='Move 6' disabled={!this.state.board[6].clickable} onClick={() => this.handleClick('6')}>{this.state.board['6'].value}</button>
                </div>
              </div>
              <div className='Row'>
                <div className='Box border-right border-top'>
                  <button className='Move 7' disabled={!this.state.board[7].clickable} onClick={() => this.handleClick('7')}>{this.state.board['7'].value}</button>
                </div>
                <div className='Box border-top'>
                  <button className='Move 8' disabled={!this.state.board[8].clickable} onClick={() => this.handleClick('8')}>{this.state.board['8'].value}</button>
                </div>
                <div className='Box border-left border-top'>
                  <button className='Move 9' disabled={!this.state.board[9].clickable} onClick={() => this.handleClick('9')}>{this.state.board['9'].value}</button>
                </div>
              </div>
            </div>

            <div className='Row'>
              <div className='Stats'>
                <span className={this.state.currentPlayer === 'user' ? 'player-turn' : ''}>Player:</span>
                <span>{this.state.playerWins}</span>
                <span> | </span>
                <span className={this.state.currentPlayer === 'computer' ? 'computer-turn' : ''}>Computer:</span>
                <span>{this.state.computerWins}</span>
              </div>
              <div className='Reset'>
                <button onClick={this.handleReset}>Reset</button>
              </div>
            </div>

          </div>
        </div>
        <div className='Footer'>
        Designed and coded by &nbsp;<a
            className='emily-link'
            href='https://www.freecodecamp.com/whylime23'
            target='_blank'
            rel='noopener noreferrer'>Emily Taylor</a>&nbsp; using Atom, React and Chrome dev tools. Background image by Jess Watters at Pexels.
        </div>
      </div>
    );
  }
}

export default App;
