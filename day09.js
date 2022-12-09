import openInput from "./helpers/openInput.js";

const moves = {
  U: [0, 1],
  D: [0, -1],
  R: [1, 0],
  L: [-1, 0],
};

const followRope = (instructions, length = 2) => {
  let rope = Array.from(Array(length), () => [0, 0]);
  const tailHistory = new Set();

  instructions.forEach(([dir, steps]) => {
    for (let i = 0; i < steps; i++) {
      // Move Head
      rope[0][0] += moves[dir][0];
      rope[0][1] += moves[dir][1];

      // Move Tail
      for (let j = 1; j < length; j++) {
        if (
          Math.abs(rope[j - 1][0] - rope[j][0]) > 1 ||
          Math.abs(rope[j - 1][1] - rope[j][1]) > 1
        ) {
          rope[j] = rope[j].map(
            (val, pos) =>
              val +
              (rope[j - 1][pos] === val
                ? 0
                : (rope[j - 1][pos] - val) / Math.abs(rope[j - 1][pos] - val))
          );
        }
      }
      // Add tail position to history
      tailHistory.add(rope.at(-1).join(","));
    }
  });

  return tailHistory.size;
};

(async () => {
  const instructions = (await openInput(process.argv[2]))
    .split("\n")
    .map((line) => [line.charAt(0), parseInt(line.slice(2))]);

  console.log("Part 1", followRope(instructions));
  console.log("Part 2", followRope(instructions, 10));
})();
