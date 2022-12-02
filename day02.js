import openInput from "./helpers/openInput.js";

// rock, paper, scissors
// lose, draw, win
const getPos = (charcode) => (charcode >= 88 ? charcode - 88 : charcode - 65);
const norm = (num) => ((num % 3) + 3) % 3;
// 3 on draw, 6 on win, 0 on loss, plus value of option
const getScore = (p1, p2) => [3, 6, 0][norm(p2 - p1)] + p2 + 1;

(async () => {
  const rounds = (await openInput(process.argv[2]))
    .split("\n")
    .map((line) => line.split(" ").map((char) => getPos(char.charCodeAt(0))));

  const part1 = rounds.reduce((s, [p1, p2]) => s + getScore(p1, p2), 0);

  const play = [
    (p1) => getScore(p1, norm(p1 - 1)), // loss
    (p1) => getScore(p1, p1), // draw
    (p1) => getScore(p1, norm(p1 + 1)), // win
  ];
  const part2 = rounds.reduce((s, [p1, res]) => s + play[res](p1), 0);

  console.log("Part 1", part1);
  console.log("Part 2", part2);
})();
