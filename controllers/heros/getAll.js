const { Hero } = require("../../models/Hero");

const getAll = async (req, res) => {
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
};
module.exports = getAll;
