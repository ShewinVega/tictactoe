


export const saveToLocalStorage = ({ board, turn}) => {

  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', turn);

};


export const deleteToLocalStorage = () => {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
};