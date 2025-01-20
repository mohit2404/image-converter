import fs from "fs";
import path from "path";

// Function to recursively get all image paths from the specified directory
export const getAllImageFiles = (dirPath) => {
  let imageFiles = [];
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);

    if (fs.statSync(itemPath).isDirectory()) {
      // Recurse into subdirectories
      imageFiles = imageFiles.concat(getAllImageFiles(itemPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      // Replace backslashes with forward slashes
      imageFiles.push(itemPath.replace(/\\/g, "/"));
    }
  }

  return imageFiles;
};

// Extract paths from "./public" directory
const res = getAllImageFiles("./public");

// Write the paths to an exportable file
fs.writeFileSync(
  "./image-paths.js",
  `export const imagesPaths = ${JSON.stringify(res, null, 2)};`
);

console.log("Image paths successfully written to image-paths.js");
