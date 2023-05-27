const { Router } = require("express");
// const { model } = require("mongoose");
const router = Router();

const validation = require("../middlewares/validation");
const { Hero, joiSchema } = require("../models/Hero");

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

router.put("/:id", validation(joiSchema), async (req, res) => {
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
});

router.post("/", validation(joiSchema), async (req, res) => {
  try {
    const { nickname } = req.body;
    const candidate = await Hero.findOne({ nickname });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "Such superhero is already in db" });
    }

    // const hero = new Hero({ ...req.body });
    // await hero.save();

    const hero = await Hero.create({ ...req.body });

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
