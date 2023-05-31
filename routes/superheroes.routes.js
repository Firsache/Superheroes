const { Router } = require("express");
const router = Router();

const { heros: ctrl } = require("../controllers");
const upload = require("../middlewares/upload");
const validation = require("../middlewares/validation");
const { joiSchema } = require("../models/Hero");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getHeroById);

router.delete("/:id", ctrl.removeHero);

router.post("/", upload.array("images"), validation(joiSchema), ctrl.addHero);

router.put(
  "/:id",
  upload.array("images"),
  validation(joiSchema),
  ctrl.updateHeroById
);

module.exports = router;
