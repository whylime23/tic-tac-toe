import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>

        <div className='Frame'>
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
              <div className='Reset'>Reset</div>
            </div>

          </div>
        </div>
        <div className='Footer'>
        Designed and coded by &nbsp;<a
          className='emily-link'
          href='https://www.freecodecamp.com/whylime23'
          target='_blank'>Emily Taylor</a>&nbsp; using Atom, React and Chrome dev tools. Background image by Jess Watters at Pexels.
        </div>
      </div>
    );
  }
}

export default App;
