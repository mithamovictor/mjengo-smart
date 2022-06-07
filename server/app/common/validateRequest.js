/**
 * This is a function that validates a request to the API where there are parameters or data in
 * the request body. It is used to check if the data matches a set schema.
 * @param {*} req
 * @param {*} next
 * @param {*} schema
 * @returns
 */
const validateRequest = (req, next, schema) => {
  const OPTIONS = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  }
  const {error, value} = schema.validate(req.body, OPTIONS)
  if (error)
    return next(`Validation error: ${error.details.map(x=>x.message).join(', ')}`)
  req.body = value
  return next()
}

module.exports = validateRequest;
