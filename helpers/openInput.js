import { readFile } from "node:fs/promises";

const openInput = async (path) => (await readFile(path, "utf-8")).trim();

export default openInput;
