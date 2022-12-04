import openInput from "./helpers/openInput.js";

const overlaps = ([min, max], value) => value >= min && value <= max;

(async () => {
  const data = (await openInput(process.argv[2]))
    .split("\n")
    .map((line) =>
      line.split(",").map((range) => range.split("-").map(Number))
    );

  const part1 = data.reduce(
    (count, [r1, r2]) =>
      (count +=
        (r1[0] <= r2[0] && r1[1] >= r2[1]) || (r2[0] <= r1[0] && r2[1] >= r1[1])
          ? 1
          : 0),
    0
  );

  const part2 = data.reduce(
    (count, [r1, r2]) =>
      (count +=
        overlaps(r1, r2[0]) ||
        overlaps(r1, r2[1]) ||
        overlaps(r2, r1[0]) ||
        overlaps(r2, r1[1])
          ? 1
          : 0),
    0
  );

  console.log("Part 1", part1);
  console.log("Part 2", part2);
})();
