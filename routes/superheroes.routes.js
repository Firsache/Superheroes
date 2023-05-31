const { Router } = require("express");
const router = Router();

const { heros: ctrl } = require("../controllers");
const upload = require("../middlewares/upload");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getHeroById);

router.delete("/:id", ctrl.removeHero);

router.post("/", upload.array("images"), ctrl.addHero);

router.put("/:id", upload.array("images"), ctrl.updateHeroById);

module.exports = router;
