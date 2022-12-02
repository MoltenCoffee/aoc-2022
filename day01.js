import openInput from "./helpers/openInput.js";

(async () => {
  const input = await openInput(process.argv[2]);
  const parsedInput = input
    .split("\n\n")
    .map((block) =>
      block.split("\n").reduce((tot, curr) => tot + (parseInt(curr) || 0), 0)
    )
    .sort((a, b) => b - a);

  console.log("Part 1", parsedInput[0]);
  console.log(
    "Part 2",
    [0, 1, 2].reduce((a, b) => a + parsedInput[b], 0)
  );
})();
