//method to calculate winner based on possoble win scenarios

export function calculateWinner(board) {
  const possibleWinSquares = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 5],
    [1, 4, 7],
    [2, 5, 8],
  ];

  for (let i = 0; i < possibleWinSquares.length; i++) {
    const [a, b, c] = possibleWinSquares[i];

    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}
