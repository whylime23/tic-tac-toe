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

    const { winnerFound, winningCombination } = this.checkWin(board);

    if (winnerFound) {
      this.triggerWinnerFound(winningCombination);
    } else {
      setTimeout(() => {
        this.setState({
          currentPlayer: 'user',
          moves: this.state.moves + 1,
          board: board,
        });
      }, 500);
    }
  }

  checkWin = (board) => {
    let winningCombination;

    const winnerFound = winCombos.some((combination) => {
      let winning = true;
      const symbol = board[combination[0]].value;

      if (!symbol) {
        return false;
      }

      for (var i = 1; i < combination.length; i++) {
        if (board[combination[i]].value !== symbol) {
          return false;
        }
      }
      winningCombination = combination;
      return true;
    });
    return { winnerFound, winningCombination };
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
      board[key].win = false;
    }

    this.setState({
      hideInitialModal: false,
      hideWinModal: true,
      user: '',
      computer: '',
      currentPlayer: '',
      moves: 0,
      gameWon: false,
      playerWins: 0,
      computerWins: 0,
      board: board,
    });
  }

  handleContinue = () => {
    const { board } = this.state;
    for (var key in board) {
      board[key].value = '';
      board[key].clickable = true;
      board[key].win = false;
    }

    this.setState({
      hideInitialModal: true,
      hideWinModal: true,
      currentPlayer: 'user',
      moves: 0,
      gameWon: false,
      board: board,
    });
  }

  triggerWinnerFound = (winningCombination) => {
    const winningModal = () => {
      if (this.state.currentPlayer === 'user') {
        this.setState ({
          playerWins: this.state.playerWins + 1,
          hideWinModal: false
        })
      } else if (this.state.currentPlayer === 'computer') {
          this.setState ({
            computerWins: this.state.computerWins + 1,
            hideWinModal: false
          });
      }
    }
    // get board from state
    const { board } = this.state;
    // loop through winningCombination
    for (let i = 0; i < winningCombination.length; i++) {
      // set square to true
      board[winningCombination[i]].win = true;
    }

    this.setState({
      gameWon: true,
      board: board,
    }, () => setTimeout(winningModal, 1000));
  }

  handleClick = (boxNo) => {
    const { board } = this.state;
    board[boxNo].clickable = false;
    board[boxNo].value =  this.state.user;

    const { winnerFound, winningCombination } = this.checkWin(board);
    if (winnerFound) {
      this.triggerWinnerFound(winningCombination);
    } else {
      this.setState({
        currentPlayer: 'computer',
        moves: this.state.moves + 1,
        board: board,
      }, this.computerTurn);
    }
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
            <div className='Game Win-modal'>
              <p className='win-message'> {this.state.currentPlayer === 'user' ? 'You have won!' : 'The Computer has won!'} </p>
              <button className='win-buttons' onClick={this.handleContinue}>Continue</button>
              <button className='win-buttons' onClick={this.handleReset}>Reset</button>
            </div>
          </div>

          <div className='Chalkboard gradient'>
            <div className='Heading'>Tic Tac Toe</div>

            <div className='Game'>
              <div className='Row'>
                <div className={`Box border-right border-bottom ${this.createClass(1)}`}>
                  <button className='Move 1' disabled={!this.state.board[1].clickable} onClick={() => this.handleClick('1')}>{this.state.board['1'].value}</button>
                </div>
                <div className={`Box border-bottom ${this.createClass(2)}`}>
                  <button className='Move 2' disabled={!this.state.board[2].clickable} onClick={() => this.handleClick('2')}>{this.state.board['2'].value}</button>
                </div>
                <div className={`Box border-left border-bottom ${this.createClass(3)}`}>
                  <button className='Move 3' disabled={!this.state.board[3].clickable} onClick={() => this.handleClick('3')}>{this.state.board['3'].value}</button>
                </div>
              </div>
              <div className='Row'>
                <div className={`Box border-right ${this.createClass(4)}`}>
                  <button className='Move 4' disabled={!this.state.board[4].clickable} onClick={() => this.handleClick('4')}>{this.state.board['4'].value}</button>
                </div>
                <div className={`Box ${this.createClass(5)}`}>
                  <button className='Move 5' disabled={!this.state.board[5].clickable} onClick={() => this.handleClick('5')}>{this.state.board['5'].value}</button>
                </div>
                <div className={`Box border-left ${this.createClass(6)}`}>
                  <button className='Move 6' disabled={!this.state.board[6].clickable} onClick={() => this.handleClick('6')}>{this.state.board['6'].value}</button>
                </div>
              </div>
              <div className='Row'>
                <div className={`Box border-right border-top ${this.createClass(7)}`}>
                  <button className='Move 7' disabled={!this.state.board[7].clickable} onClick={() => this.handleClick('7')}>{this.state.board['7'].value}</button>
                </div>
                <div className={`Box border-top ${this.createClass(8)}`}>
                  <button className='Move 8' disabled={!this.state.board[8].clickable} onClick={() => this.handleClick('8')}>{this.state.board['8'].value}</button>
                </div>
                <div className={`Box border-left border-top ${this.createClass(9)}`}>
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
