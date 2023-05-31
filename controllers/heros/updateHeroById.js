const fs = require("fs/promises");
const path = require("path");

const { Hero } = require("../../models/Hero");
// const { Hero, joiSchema } = require("../../models/Hero");
// const validation = require("../../middlewares/validation");
const deleteImages = require("../../helpers/deleteImages");
const { renameImage } = require("../../helpers/renameImage");
const publicImagesDir = path.resolve("public");

const updateHeroById = async (req, res) => {
  // validation(joiSchema);

  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({ message: "Such superhero is not found" });
    }
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      old_images,
    } = req.body;

    if (hero.nickname !== nickname) {
      const candidate = await Hero.findOne({ nickname });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Superhero with such name is already in db" });
      }
    }

    const imagesUploaded = [];
    const imagesArr = req.files;

    for (let i = 0; i < imagesArr.length; i++) {
      const { path: tempUpload, originalname } = imagesArr[i];
      const imagesURL = path.join(`${nickname}_${originalname}`);
      const resultUpload = path.join(publicImagesDir, imagesURL);
      try {
        await fs.rename(tempUpload, resultUpload);
      } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
      }
      imagesUploaded.push(imagesURL);
    }
    const oldImg = Array.isArray(old_images) ? old_images : [old_images];

    if (oldImg.length >= 1) {
      const imagesToDel = hero.images.filter((elem) => !oldImg.includes(elem));
      if (imagesToDel.length >= 1) {
        deleteImages(imagesToDel);
      }
    }

    let allImages = [];
    if (hero.nickname !== nickname && oldImg.length >= 1) {
      const renamedImages = renameImage(oldImg, nickname);
      allImages = [...renamedImages, ...imagesUploaded];
    } else {
      allImages = [...oldImg, ...imagesUploaded];
    }

    const updatedHero = {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: allImages,
    };

    const response = await Hero.findByIdAndUpdate(req.params.id, updatedHero, {
      new: true,
    });

    res.status(201).json({
      message: "Updated the superhero",
      data: {
        result: response,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = updateHeroById;
