import React, { useState, useMemo } from 'react';
import './App.css';
import { getEmptyBoard, getNextBoard, addToColumn, findWin } from './connect-four-brain/index.ts';
import useWindowSize from './hooks/useWindowSize.ts';

function App() {
  const columns = 7, rows = 6, streakLen = 4;
  const [ board, updateBoard ] = useState(getEmptyBoard(columns, rows, streakLen));
  const [ currentTurn, nextTurn ] = useState(0);
  const [ isGameover, gameover ] = useState(false);
  const { width:screenWidth, height:screenHeight } = useWindowSize();

  const players = [
    {name: 'Red', id: '0', className: 'token--red'},
    {name: 'Black', id: '1', className: 'token--black'}
  ];

  const { full:tokenSize, half:tokenHalfSize } = useMemo(
    () => getTokenSize(columns + 1, rows + 1, screenWidth, screenHeight), 
    [columns, rows, screenWidth, screenHeight]
  );
  const tokenStyles = {width: tokenSize, height: tokenSize};

  const newGame = (e) => {
    updateBoard(getEmptyBoard());
    gameover(false);
  };

  const getHandleClick = (idx) => (e) => {
    try {
      const emptyLocation = addToColumn(idx, board);
      const token = players[currentTurn];
      let nextBoard = getNextBoard(emptyLocation, board, {...token});
      const win = findWin(emptyLocation, nextBoard);
      if(win.length === 4) {
        gameover(true);
        win.forEach((locationTuple) => {
          nextBoard = getNextBoard(locationTuple, nextBoard, {...token, winner: true});
        });
        // Show a popup maybe?
      }
      updateBoard(nextBoard);
      nextTurn(currentTurn + 1 === players.length ? 0 : currentTurn + 1);
    } catch(e) {
      // Show a popup maybe?
    }
  };

  const getClassNames = (token, isGameover) => {
    const classNames = ['token'];
    if(token !== null && token.className) {
      classNames.push(token.className);
    }
    if(isGameover) {
      classNames.push('token--gameover');
    }
    if(token !== null && token.winner) {
      classNames.push('token--winner');
    }
    return classNames.join(' ');
  };

  return (
    <div className="App">
      <div className="board">
        {board.map((column, columnNumber) => 
          <button 
            className="board__column" 
            style={{borderRadius: tokenHalfSize}}
            key={`column-${columnNumber}`}
            onClick={isGameover ? newGame : getHandleClick(columnNumber)}
          >
            {column.slice().reverse().map(
              (token, rowNum) => 
                <div 
                  style={tokenStyles} 
                  className={getClassNames(token, isGameover)} 
                  key={rowNum}
                >
                </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function getTokenSize(boardWidth, boardHeight, screenWidth, screenHeight) {
  const sizes = [
    {size: Math.floor(screenWidth / boardWidth), unit: 'vw', divisor: screenWidth}, 
    {size: Math.floor(screenHeight / boardHeight), unit: 'vh', divisor: screenHeight}
  ];
  const tokenSize = Math.min(...sizes.map(({size}) => size));
  const tokenSizeObj = sizes.reduce((acc, {size, unit, divisor}, idx) => {
    if(size === tokenSize) {
      const percentage = Math.floor((tokenSize / divisor) * 100);
      return { size, unit, percentage };
    }
    return acc;
  }, null);
  const full = `${tokenSizeObj.percentage}${tokenSizeObj.unit}`;
  const half = `${tokenSizeObj.percentage / 2}${tokenSizeObj.unit}`;
  return { full, half };
}

export default App;
