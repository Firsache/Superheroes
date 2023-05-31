const fs = require("fs/promises");
const path = require("path");
const publicImagesDir = path.resolve("public");

const renameImage = (arrImages, newNickname) => {
  const newArrImages = arrImages.map(async (elem) => {
    const arr = elem.split("_");
    arr[0] = newNickname;
    const newElem = arr.join("_");

    const oldNname = path.join(publicImagesDir, elem);
    const newMane = path.join(publicImagesDir, newElem);
    try {
      await fs.rename(oldNname, newMane);
    } catch (error) {
      throw error;
    }
    elem = newElem;
  });

  return newArrImages;
};
module.exports = renameImage;
