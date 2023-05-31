const fs = require("fs/promises");
const path = require("path");

const publicImagesDir = path.resolve("public");

const deleteImages = (arrImages) => {
  arrImages.map(async (image) => {
    const imgHero = path.join(publicImagesDir, image);
    try {
      await fs.unlink(imgHero);
    } catch (error) {}
  });
};

module.exports = deleteImages;
