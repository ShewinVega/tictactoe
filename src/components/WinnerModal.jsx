import { Square } from './Square';

/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
export function WinnerModal ({winner, resetGame}) {

  if (winner === null) return null;

  const winnerText = winner === false ? 'Empate' : 'Ganó';

  return (
    <section className='winner'>
      <div className='text'>
        <h2>
          {winnerText}
        </h2>
        <header className='win'>
          { winner && <Square>{winner}</Square> }
        </header>

        <footer>
          <button onClick={resetGame}>Start Again</button>
        </footer>
      </div>
    </section>
  );

}