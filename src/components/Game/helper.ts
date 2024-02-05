export const checkWinner = (squares: (string | null)[]): string | null => {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as string;
    }
  }

  return null;
};

export const checkIsDraw = (squares: (string | null)[]): boolean => {
  for (let square of squares) {
    if (!square) return false;
  }
  return true;
};
