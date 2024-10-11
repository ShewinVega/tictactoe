import { winner_combos } from '../constant';

export function checkWinnersFrom (boardToCheck) {
  for (const combo of winner_combos) {
    // get the combination from each winner_combos array
    const [a, b, c] = combo;

    // Validate if the combination has the same element.
    if(
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {

      return boardToCheck[a]; // X or 0
    }
  }
  // If we dont have winner
  return null;  
}


export function checkEndGame (newBoard) {
  // Check if there is not empty spaces
  return newBoard.every((square) => square !== null);
}