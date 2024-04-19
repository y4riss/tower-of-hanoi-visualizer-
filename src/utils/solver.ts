let moves: Array<[number, number]> = [];

const solve = (n: number, src: number, dest: number) => {
  if (n == 1) {
    moves.push([src, dest]);
    return;
  }
  solve(n - 1, src, 6 - (src + dest));
  moves.push([src, dest]);
  solve(n - 1, 6 - (src + dest), dest);
};

const solver = (n: number) => {
  moves = [];
  solve(n, 1, 3);
  return moves;
};

export default solver;
