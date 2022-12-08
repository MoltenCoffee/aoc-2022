import openInput from "./helpers/openInput.js";

const visibility = (row, height) => {
  if (row.length === 0) return [true, 0];
  let hasHeigher = false;
  let visibleCount = 0;

  for (let i = 0; i < row.length; i++) {
    visibleCount += 1;
    if (row[i] >= height) {
      hasHeigher = true;
      break;
    }
  }

  return [!hasHeigher, visibleCount];
};

(async () => {
  const grid = (await openInput(process.argv[2]))
    .split("\n")
    .map((line) => line.split("").map(Number));

  // Count all the edges
  let part1 = 0;
  let part2 = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const height = grid[y][x];
      const details = [
        visibility(grid[y].slice(0, x).reverse(), height),
        visibility(grid[y].slice(x + 1), height),
        visibility(
          grid
            .slice(0, y)
            .map((row) => row[x])
            .reverse(),
          height
        ),
        visibility(
          grid.slice(y + 1).map((row) => row[x]),
          height
        ),
      ];

      const scenicScore = details.reduce((acc, [, visibleCount]) => {
        return acc * visibleCount;
      }, 1);

      part2 = Math.max(part2, scenicScore);
      if (details.some(([isVisible]) => isVisible)) part1++;
    }
  }

  console.log("Part 1", part1);
  console.log("Part 2", part2);
})();
