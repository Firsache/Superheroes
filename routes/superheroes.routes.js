const { Router } = require("express");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const router = Router();

const validation = require("../middlewares/validation");
const upload = require("../middlewares/upload");

const { Hero, joiSchema } = require("../models/Hero");
const publicImagesDir = path.resolve("public", "heros");

router.get("/", async (req, res) => {
  try {
    const heros = await Hero.find();
    res.status(200).json({
      message: "success",
      data: {
        result: heros,
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

    res.status(200).json({
      message: "A superhero is deleted",
      data: {
        result: hero,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put(
  "/:id",
  validation(joiSchema),
  upload.single("images"),
  async (req, res) => {
    try {
      const response = await Hero.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!response) {
        return res.status(404).json({ message: "Such superhero is not found" });
      }
      res.status(201).json({
        message: "Updated the superhero",
        data: {
          result: response,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.post(
  "/",
  // validation(joiSchema),
  upload.array("images"),
  async (req, res) => {
    console.log(req);
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
      console.log(imagesArr);

      for (let i = 0; i < imagesArr.length; i++) {
        const imagesURL = path.join(
          "images",
          `${nickname}_${imagesArr[i].originalname}`
        );
        const resultUpload = path.join(publicImagesDir, imagesURL);

        const img = await Jimp.read(imagesArr[i].path);
        await img
          .autocrop()
          .cover(
            250,
            250,
            Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
          )
          .writeAsync(imagesArr[i].path);

        try {
          await fs.rename(imagesArr[i].path, resultUpload);
        } catch (error) {
          await fs.unlink(imagesArr[i].path);
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
  }
);

module.exports = router;
