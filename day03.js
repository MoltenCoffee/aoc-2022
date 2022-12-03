import openInput from "./helpers/openInput.js";

const priority = (charcode) => (charcode >= 97 ? charcode - 96 : charcode - 38);

(async () => {
  const data = (await openInput(process.argv[2]))
    .split("\n")
    .map((t) => t.split(""));

  const part1 = data
    .map((s) => [s.slice(0, s.length / 2), s.slice(s.length / 2)])
    .reduce(
      (tot, [c1, c2]) =>
        tot +
        priority(c1.find((element) => c2.includes(element)).charCodeAt(0)),
      0
    );

  let part2 = 0;
  for (let i = 0; i < data.length; i += 3) {
    part2 += priority(
      data[i]
        .find(
          (element) =>
            data[i + 1].includes(element) && data[i + 2].includes(element)
        )
        .charCodeAt(0)
    );
  }

  console.log("Part 1", part1);
  console.log("Part 2", part2);
})();
