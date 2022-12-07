import openInput from "./helpers/openInput.js";

const TOTAL_SPACE = 70000000;
const SIZE_NEEDED = 30000000;

const getDirSizes = (dir) => {
  let sizes = [];
  dir.size = dir.children.reduce((acc, child) => {
    if (child.type === "dir" && child.size === 0) {
      sizes = sizes.concat(setDirSize(child));
    }
    return acc + child.size;
  }, 0);
  sizes.push(dir.size);
  return sizes;
};

(async () => {
  const lines = (await openInput(process.argv[2])).split("\n");
  const root = { root: true, children: [], type: "dir", parent: null };

  let currentDir = null;
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("$")) {
      // line is command
      const command = line.slice(2, 4);
      if (command === "cd") {
        const dir = line.slice(5);
        switch (dir) {
          case "/":
            // Move to root
            currentDir = root;
            break;
          case "..":
            // Move to parent dir
            currentDir = currentDir.parent;
            break;
          default: {
            // Move to child dir,
            currentDir = currentDir.children.find((c) => c.name === dir);
          }
        }
      } else if (command === "ls") {
        // Traverse lines declaring files and dirs, creating those
        for (let j = i + 1; j < lines.length; j++) {
          const line = lines[j];
          if (line.startsWith("$")) {
            i = j - 1;
            break;
          } else if (line.startsWith("dir")) {
            currentDir.children.push({
              name: line.slice(4),
              type: "dir",
              parent: currentDir,
              size: 0,
              children: [],
            });
          } else {
            const [size, name] = line.split(" ");
            currentDir.children.push({
              name,
              type: "file",
              parent: currentDir,
              size: parseInt(size),
            });
          }
        }
      }
    }
    i++;
  }

  const sizes = getDirSizes(root);
  const part1 = sizes
    .filter((val) => val < 100000)
    .reduce((acc, size) => acc + size, 0);

  const spaceNeeded = SIZE_NEEDED - (TOTAL_SPACE - Math.max(...sizes));
  let part2 = null;
  sizes.forEach((size) => {
    if (size >= spaceNeeded) {
      if (part2 === null) part2 = size;
      else if (size < part2) part2 = size;
    }
  });

  console.log("Part 1", part1);
  console.log("Part 2", part2);
})();
