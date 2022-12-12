import openInput from "./helpers/openInput.js";

const doOp = (val, [left, op, right]) => {
  const leftVal = left === "old" ? val : left;
  const rightVal = right === "old" ? val : right;

  switch (op) {
    case "*":
      return leftVal * rightVal;
    case "+":
      return leftVal + rightVal;
    case "-":
      return leftVal - rightVal;
  }
};

const getMonkeyBusiness = (monkeys, rounds, divideBy = 1) => {
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach(({ items, op, test, ifTrue, ifFalse }, j) => {
      items.forEach((worry) => {
        const worryLevel = Math.floor(doOp(worry, op) / divideBy);
        monkeys[worryLevel % test === 0 ? ifTrue : ifFalse].items.push(
          worryLevel
        );
        monkeys[j].activity++;
      });
      items.length = 0;
    });
  }

  monkeys.sort((a, b) => b.activity - a.activity);
  return monkeys[0].activity * monkeys[1].activity;
};

(async () => {
  const monkeys = (await openInput(process.argv[2]))
    .split("\n\n")
    .map((monkey) => {
      const lines = monkey.split("\n").map((line) => line.trim());

      return {
        items: lines[1].split(": ")[1].split(", ").map(Number),
        op: lines[2]
          .split("=")[1]
          .trim()
          .split(" ")
          .map((x) => Number(x) || x),
        test: parseInt(lines[3].split(" ").at(-1)),
        ifTrue: parseInt(lines[4].split(" ").at(-1)),
        ifFalse: parseInt(lines[5].split(" ").at(-1)),
        activity: 0,
      };
    });

  const part1 = getMonkeyBusiness(monkeys, 20, 3);
  // const part2 = getMonkeyBusiness(monkeys, 10000);

  console.log("Part 1", part1);
  // console.log("Part 2", part2);
})();
