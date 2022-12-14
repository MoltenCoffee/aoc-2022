import openInput from "./helpers/openInput.js";
const { isArray } = Array;

const compare = (left, right) => {
  for (let i = 0; i < left.length; i++) {
    if (right[i] == null) return false;

    if (isArray(left[i]) && isArray(right[i])) {

    }
  }
  return left.length < right.length || null;
};

(async () => {
  const pairs = (await openInput(process.argv[2]))
    .split("\n\n")
    .map((pair) => pair.split("\n").map((line) => JSON.parse(line)));

  pairs
    .map((pair) => compare(...pair))
    .reduce((acc, cur, i) => {
      if (cur) acc += i + 1;
    }, 0);

  const part1 = null;

  const part2 = null;

  console.log("Part 1", part1);
  console.log("Part 2", part2);
})();
