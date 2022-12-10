import openInput from "./helpers/openInput.js";

const checkingCycles = [20, 60, 100, 140, 180, 220];
const screenHeight = 6;
const screenWidth = 40;
const white = "░";
const black = "█";

(async () => {
  const data = (await openInput(process.argv[2])).split("\n").map((line) => {
    const op = line.split(" ");
    if (op[1]) op[1] = parseInt(op[1]);
    return op;
  });

  let cycle = 0;
  let X = 1;
  let signalStrengthSum = 0;
  const screen = Array.from({ length: screenHeight }, () =>
    Array(screenWidth).fill(black)
  );

  const getPixel = (cycle) => [
    Math.floor(cycle / screenWidth),
    cycle % screenWidth,
  ];
  const printPixel = (x, y) => (screen[y][x] = white);

  const handleCycle = () => {
    cycle++;
    const [y, x] = getPixel(cycle - 1);
    if ([X - 1, X, X + 1].includes(x)) {
      printPixel(x, y);
    }
    if (checkingCycles.includes(cycle)) {
      signalStrengthSum += cycle * X;
    }
  };

  data.forEach(([op, val]) => {
    handleCycle();
    if (op === "addx") {
      handleCycle();
      X += parseInt(val);
    }
  });

  console.log("Part 1", signalStrengthSum);
  console.log("Part 2");
  console.log(screen.map((line) => line.join("")).join("\n"));
})();
