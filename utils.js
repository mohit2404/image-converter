import fs from "fs";
import path from "path";

// function to get all the images paths from the public folder
export const getAllImageFiles = (dirPath) => {
  let imageFiles = [];
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);

    if (fs.statSync(itemPath).isDirectory()) {
      imageFiles = imageFiles.concat(getAllImageFiles(itemPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      imageFiles.push(`./${itemPath.replace(/\\/g, "/")}`);
    }
  }

  return imageFiles;
};

const res = getAllImageFiles("./public");
fs.writeFileSync(
  "./image-paths.js",
  `export const imagesPaths = ${JSON.stringify(res, null, 2)};`
);
