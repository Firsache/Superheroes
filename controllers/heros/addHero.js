// const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const { Hero, joiSchema } = require("../../models/Hero");
const validation = require("../../middlewares/validation");
const publicImagesDir = path.resolve("public");

const addHero = async (req, res) => {
  validation(joiSchema);
  try {
    const { nickname } = req.body;
    const images = [];
    const imagesArr = req.files;

    const candidate = await Hero.findOne({ nickname });
    if (candidate) {
      for (let i = 0; i < imagesArr.length; i++) {
        const { path: tempUpload } = imagesArr[i];
        await fs.unlink(tempUpload);
      }
      return res
        .status(400)
        .json({ message: "Such superhero is already in db" });
    }

    for (let i = 0; i < imagesArr.length; i++) {
      const { path: tempUpload, originalname } = imagesArr[i];
      const imagesURL = path.join(`${nickname}_${originalname}`);
      const resultUpload = path.join(publicImagesDir, imagesURL);

      // const img = await Jimp.read(tempUpload);
      // await img
      //   .autocrop()
      //   .cover(
      //     250,
      //     250,
      //     Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      //   )
      //   .writeAsync(tempUpload);

      try {
        await fs.rename(tempUpload, resultUpload);
      } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
      }
      images.push(imagesURL);
    }
    const hero = await Hero.create({ ...req.body, images });

    res.status(201).json({
      message: "created a hero",
      data: {
        result: hero,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = addHero;
