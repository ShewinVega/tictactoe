import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constant.js';
import { checkWinnersFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from './components/WinnerModal.jsx';
import { deleteToLocalStorage, saveToLocalStorage } from './storage/index.js';

function App() {
  // Board State
  const [board, setBoard ] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  // Turns State
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  // Winner State
  const [winner, setWinner] = useState(null); // Null => There is not winner & False => The game was tied

  // Reset Game
  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    // Delete the board and turn from localStorage
    deleteToLocalStorage();
  }

  // Main Function
  const updateBoard = (index) => {
    
    // We dont update this position. Validation
    if(board[index] || winner ) return;

    // Update the board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Change Turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Save the status of the current game
    saveToLocalStorage({
      board:newBoard,
      turn:newTurn
    });
  
    // Check if we have a Winner
    const newWinner = checkWinnersFrom(newBoard);
    if(newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toc</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard} >{board[index]}</Square>
            );
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  );
}

export default App
