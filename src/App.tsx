import './App.css';
import { useCallback, useMemo, useState } from 'react';

import generateBoard from './utils/generateBoard';

import { CircleIcon } from './components/CircleIcon';
import { TimesIcon } from './components/TimesIcon';

const STATES = {
  times: 1,
  circle: 2,
};
const BOARD_SIZE = 3;

function App() {
  const [board, setBoard] = useState(generateBoard(BOARD_SIZE));
  const [turn, setTurn] = useState(STATES.times);
  const [counter, setCounter] = useState(0);

  const onSelect = useCallback(
    (row: number, column: number) => {
      if (board[row][column] !== -1) return;

      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[row][column] = turn;
        return newBoard;
      });
      setCounter((prevCounter) => (prevCounter += 1));
      setTurn((prevTurn) =>
        prevTurn === STATES.times ? STATES.circle : STATES.times
      );
    },
    [board]
  );

  const winner = useMemo(() => {
    // Check rows and columns
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] !== -1 &&
        board[i].every((cell: number) => cell === board[i][0])
      )
        return board[i][0];

      if (board[0][i] !== -1 && board.every((row) => row[i] === board[0][i]))
        return board[0][i];
    }

    // Check diagonals
    if (
      board[0][0] !== -1 &&
      board.every((row, index) => row[index] === board[0][0])
    )
      return board[0][0];

    if (
      board[0][2] !== -1 &&
      board.every((row, index) => row[2 - index] === board[0][2])
    )
      return board[0][2];

    return -1;
  }, [board]);

  const isGameEnded = useMemo(() => {
    return counter === BOARD_SIZE * BOARD_SIZE && winner === -1;
  }, [counter, winner]);

  return (
    <>
      {winner === -1 && !isGameEnded && (
        <div className="turn">
          <p>Your turn </p>
          {turn === STATES.circle && <CircleIcon />}
          {turn === STATES.times && <TimesIcon />}
        </div>
      )}
      <div
        className={winner !== -1 || isGameEnded ? 'board disabled' : 'board'}
      >
        {board.map((row, rowIndex: number) => (
          <div className={'row'}>
            {row.map((column: number, columnIndex: number) => (
              <div
                key={columnIndex}
                className={column !== -1 ? 'panel selected' : 'panel'}
                onClick={() => onSelect(rowIndex, columnIndex)}
              >
                {column === STATES.circle && <CircleIcon />}
                {column === STATES.times && <TimesIcon />}
              </div>
            ))}
          </div>
        ))}
      </div>

      {(winner !== -1 || isGameEnded) && (
        <div className="winner">
          <p>Winner </p>
          {winner === STATES.circle && <CircleIcon />}
          {winner === STATES.times && <TimesIcon />}
          {isGameEnded && (
            <p>
              <b>No winner :c</b>
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default App;
