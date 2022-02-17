const Joi = require('joi');

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  performer: Joi.string().required(),
  genre: Joi.string().regex(/^[a-z]+$/).required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

module.exports = SongPayloadSchema;
