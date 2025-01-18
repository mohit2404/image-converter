import sharp from "sharp";
import { imagesPaths } from "./image-paths.js";

const convertImages = async () => {
  for (const imagePath of imagesPaths) {
    const outputPath = imagePath.replace(".jpg", ".webp");

    // Convert the image to WebP
    const res = await sharp(imagePath).webp({ quality: 60 }).toFile(outputPath);
    console.log(imagePath, "-", res);
  }
};

convertImages();
