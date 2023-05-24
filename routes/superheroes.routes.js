const { Router } = require("express");
const { model } = require("mongoose");

const { validation } = require("../middlewares/validation");
const { Hero, joiSchema } = require("../models/Hero");

// const config = require("config");
const router = Router();

router.post("/newhero", validation(joiSchema), async (req, res) => {
  try {
    const { nickname } = req.body;
    const candidate = await Hero.findOne({ nickname });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Such superhero is already in db" });
    }

    const hero = new Hero({ ...req.body });
    await hero.save();

    res.status(201).json({
      message: "created a hero",
      data: {
        result: hero,
      },
    });
  } catch (error) {}
});

router.get("/", auth, async (req, res) => {
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

router.get("/:id", auth, async (req, res) => {
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

module.exports = router;
