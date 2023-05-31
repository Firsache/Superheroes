const deleteImages = require("../../helpers/deleteImages");
const { Hero } = require("../../models/Hero");

const removeHero = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: "Such superhero is not found" });
    }

    deleteImages(hero.images);
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
};
module.exports = removeHero;
