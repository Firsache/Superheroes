const validation = (schema) => {
  return (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(00).json({ message: error });
    }
  };
};

module.exports = validation;
