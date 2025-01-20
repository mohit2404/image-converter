import fs from "fs";
import path from "path";
import sharp from "sharp";
import { imagesPaths } from "./image-paths.js";

const convertImages = async () => {
  const folderCounts = {}; // Object to keep track of counts for each folder

  for (const imagePath of imagesPaths) {
    // Determine output directory by replacing "public" with "output"
    const relativePath = imagePath.replace("public", "./output");
    const outputDir = path.dirname(relativePath);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Reset count for each folder
    if (!folderCounts[outputDir]) {
      folderCounts[outputDir] = 0;
    }

    // Generate the output file name
    const outputFileName = `${folderCounts[outputDir]}.webp`;
    const outputFilePath = path.join(outputDir, outputFileName).replace(/\\/g, "/");

    try {
      // Convert the image to WebP
      await sharp(imagePath).webp({ quality: 60 }).toFile(outputFilePath);
      console.log(`Converted: ${imagePath} -> ${outputFilePath}`);

      // Increment the count for the current folder
      folderCounts[outputDir]++;
    } catch (err) {
      console.error(`Error converting ${imagePath}:`, err.message);
    }
  }
};

convertImages();
