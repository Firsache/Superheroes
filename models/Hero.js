const { Schema, model } = require("mongoose");
const Joi = require("joi");

const heroSchema = new Schema(
  {
    nickname: { type: String, required: true, unique: true },
    real_name: { type: String, required: false },
    origin_description: { type: String, required: true },
    superpowers: { type: String, required: true },
    catch_phrase: { type: String, required: false },
    images: [{ type: String }],
    old_images: { any: Schema.Types.Mixed },
  },
  { versionKey: false, timestamps: true }
);

const Hero = model("Hero", heroSchema);

const joiSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).required(),
  real_name: Joi.string().min(3).max(40),
  origin_description: Joi.string().min(10).required(),
  superpowers: Joi.string().min(10).required(),
  catch_phrase: Joi.string().min(10),
  old_images: Joi.any(),
  images: Joi.any(),
});

module.exports = { Hero, joiSchema };
