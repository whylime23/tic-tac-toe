import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    hideModal: false,
    user: '',
    computer: '',
    currentPlayer: '',
    moves: 0,
    playerWins: 0,
    computerWins: 0
  }

  handleX = ()  => {
    this.setState({
      hideModal: true,
      user: 'X',
      computer: 'O',
      currentPlayer: 'user'
    });
  }

  handleO = () => {
    this.setState({
      hideModal: true,
      user: 'O',
      computer: 'X',
      currentPlayer: 'computer'
    });
  }

  handleReset = () => {
    this.setState({
      hideModal: false,
      user: '',
      computer: '',
      currentPlayer: '',
      moves: 0
    });
  }

  render() {
    return (
      <div className='App'>

        <div className='Frame'>

          <div className={`Modal Chalkboard gradient ${this.state.hideModal ? 'modal-hidden' : ''}`}>
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

          <div className='Chalkboard gradient'>
            <div className='Heading'>Tic Tac Toe</div>

            <div className='Game'>
              <div className='Row'>
                <div className='Box 1 border-right border-bottom'></div>
                <div className='Box 2 border-bottom'></div>
                <div className='Box 3 border-left border-bottom'></div>
              </div>
              <div className='Row'>
                <div className='Box 4 border-right'></div>
                <div className='Box 5'></div>
                <div className='Box 6 border-left'></div>
              </div>
              <div className='Row'>
                <div className='Box 7 border-right border-top'></div>
                <div className='Box 8 border-top'></div>
                <div className='Box 9 border-left border-top'></div>
              </div>
            </div>

            <div className='Row'>
              <div className='Stats'>Player: 0 | Computer: 0</div>
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
