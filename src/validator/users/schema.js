const Joi = require('joi');

const UserPyaloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

module.exports = UserPyaloadSchema;
