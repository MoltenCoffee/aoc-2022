import openInput from "./helpers/openInput.js";

const detectUniqueChars = (data, length) => {
  let buffer = data.slice(0, length);
  let i = 0;
  do {
    buffer = data.slice(i, i + length);
    i++;
  } while (new Set(buffer).size !== length);

  return i + length - 1;
};

(async () => {
  const data = await openInput(process.argv[2]);

  console.log("Part 1", detectUniqueChars(data, 4));
  console.log("Part 2", detectUniqueChars(data, 14));
})();
