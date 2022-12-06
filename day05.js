import openInput from "./helpers/openInput.js";

(async () => {
  const data = (await openInput(process.argv[2], false)).split("\n\n");

  const stackData = data[0].split("\n").reverse();
  const width = parseInt(stackData[0].at(-1));
  const stacks = Array(width)
    .fill(null)
    .map(() => []);

  for (let i = 1; i < stackData.length; i++) {
    const data = stackData.at(i);

    let j = 0;
    for (let pos = 1; pos < data.length; pos += 4) {
      const value = data[pos];
      const char = value.charCodeAt(0);
      if (char > 64 && char < 91) stacks[j][i - 1] = value;
      j++;
    }
  }

  const instructions = data[1]
    .trim()
    .split("\n")
    .map((line) => {
      const [_, times, from, to] = line.match(/(\d+).+(\d+).+(\d+)/);
      return [parseInt(times), parseInt(from) - 1, parseInt(to) - 1];
    });

  // Part 1
  const stacks1 = structuredClone(stacks);
  const moveOne = (times, from, to) => {
    for (let i = 0; i < times; i++) {
      stacks1[to].push(stacks1[from].pop());
    }
  };

  instructions.forEach(([times, from, to]) => moveOne(times, from, to));
  const part1 = stacks1.map((stack) => stack.at(-1)).join("");

  // Part 2
  const moveMultiple = (count, from, to) =>
    (stacks[to] = stacks[to].concat(
      stacks[from].splice(stacks[from].length - count)
    ));

  instructions.forEach(([count, from, to]) => moveMultiple(count, from, to));
  const part2 = stacks.map((stack) => stack.at(-1)).join("");

  console.log("Part 1", part1);
  console.log("Part 2", part2);
})();
