const { Router } = require("express");
const path = require("path");
const fs = require("fs/promises");
// const Jimp = require("jimp");
const router = Router();

const validation = require("../middlewares/validation");
const upload = require("../middlewares/upload");

const { Hero, joiSchema } = require("../models/Hero");
const publicImagesDir = path.resolve("public");

router.get("/", async (req, res) => {
  const page = req.query.p || 1;
  const heroesPerPage = 5;
  try {
    const allHeros = await Hero.find();
    const heros = await Hero.find()
      .limit(heroesPerPage)
      .skip((page - 1) * heroesPerPage);
    res.status(200).json({
      message: "success",
      data: {
        result: heros,
        total: allHeros.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    res.status(200).json({
      message: "success",
      data: {
        result: hero,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: "Such superhero is not found" });
    }

    hero.images.map(async (image) => {
      const imgHero = path.join(publicImagesDir, image);
      try {
        await fs.unlink(imgHero);
      } catch (error) {}
    });

    const heroToDel = await Hero.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: "A superhero is deleted",
      data: {
        result: heroToDel,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", upload.array("images"), async (req, res) => {
  validation(joiSchema);

  try {
    const hero = await Hero.findById(req.params.id);

    if (!hero) {
      return res.status(404).json({ message: "Such superhero is not found" });
    }

    const imagesUploaded = [];
    const imagesArr = req.files;

    for (let i = 0; i < imagesArr.length; i++) {
      const { path: tempUpload, originalname } = imagesArr[i];
      const imagesURL = path.join(`${hero.nickname}_${originalname}`);
      const resultUpload = path.join(publicImagesDir, imagesURL);
      try {
        await fs.rename(tempUpload, resultUpload);
      } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
      }
      imagesUploaded.push(imagesURL);
    }
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      old_images,
    } = req.body;
    const oldImg = Array.isArray(old_images) ? old_images : [old_images];

    const updatedHero = {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: [...oldImg, ...imagesUploaded],
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
});

router.post("/", upload.array("images"), async (req, res) => {
  validation(joiSchema);
  try {
    const { nickname } = req.body;
    const candidate = await Hero.findOne({ nickname });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Such superhero is already in db" });
    }
    const images = [];
    const imagesArr = req.files;

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
});

module.exports = router;
