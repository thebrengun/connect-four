import React, { useState } from 'react';
import './App.css';
import { createBoard, dropPiece } from './connect-four-brain/index.ts';

function App() {
  const tokens = ['RED', 'BLACK'];
  const [ board, updateBoard ] = useState(createBoard());
  const [ turn, changeTurn ] = useState(false);
  const [ winningTokens, declareWinner ] = useState([]);

  const getHandleColumnClick = (colIdx) => (e) => {
    try {
      const { board:nextBoard, streak:nextStreak } = dropPiece(board, colIdx, tokens[turn * 1]);
      updateBoard(nextBoard);
      if(nextStreak.length) {
        declareWinner(nextStreak);
      } else {
        changeTurn(!turn);
      }
    } catch(err) {
      alert(err);
    }
  };

  const newGame = () => {
    updateBoard(createBoard());
    declareWinner([]);
  };

  return (
    <div className="App">
      {winningTokens.length === 0 && <div className="turn">{turn * 1 === 0 ? <span className="--red-text">Red Turn</span> : <span className="--black-text">Black Turn</span>}</div>}
      {winningTokens.length !== 0 && <div className="turn">
        {turn * 1 === 0 ? <span className="--red-text">Red Wins!</span> : <span className="--black-text">Black Wins!</span>}
      </div>}
      <div className="board">
        {board.map(
          (row, rowIdx) => 
            <div className="board__row" key={`board-row-${rowIdx}`}>
              {row.map(
                (col, colIdx) => 
                  <div 
                    className={`board__cell ${winningTokens.length ? 'board__cell--game-over' : ''} ${winningTokens.filter(([winningRow, winningCol]) => winningRow === rowIdx && winningCol === colIdx).length ? 'board__cell--winner' : ''}`} 
                    key={`board-col-${colIdx}`} 
                    onClick={winningTokens.length ? newGame : getHandleColumnClick(colIdx)}
                  >
                    <div className={`token ${col === null ? 'token--empty' : col === 'RED' ? 'token--red' : 'token--black'}`}>
                    </div>
                  </div>
              )}
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
