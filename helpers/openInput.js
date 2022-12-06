import { readFile } from "node:fs/promises";

const openInput = async (path, trim = true) => {
  const data = await readFile(path, "utf-8")
  return trim ? data.trim() : data;
};

export default openInput;
