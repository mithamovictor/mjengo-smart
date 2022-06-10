const Joi = require('joi');
const validateRequest = require('../common/validateRequest');

/**
 * registerUserSchema() is used to verify that data passed meets a predefined schema.
 * This is passed to the validateRequest() function if all conditions are met and the
 * message Authorized is sent ot the response. Otherwise this is processed by the
 * errorHandler() function if there is an error and an error message of unauthorized
 * is passed as response.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.registerUserSchema = (req, res, next) => {
  const SCHEMA = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string().allow(null, ''),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9(),-_., ]{8,30}$')).required()
  });
  validateRequest(req, next, SCHEMA);
}

/**
 * Function to check if credentials are properly passed as request body parameters. Pushes errors
 * to the errorHandler function if any.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
 exports.authenticateUserSchema = (req, res, next) => {
  const SCHEMA = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
  validateRequest(req, next, SCHEMA)
}


exports.postSchema = (req, res, next) => {
  const SCHEMA = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.number().required()
  });
  validateRequest(req, next, SCHEMA);
}
