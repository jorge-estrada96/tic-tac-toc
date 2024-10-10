function generateBoard(size: number): Array<any> {
  let board = [];

  for (let i = 0; i < size; i++) {
    board.push(Array(size).fill(-1));
  }

  return board;
}

export default generateBoard;
