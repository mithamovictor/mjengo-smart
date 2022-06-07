/**
 * This is an error handler for possible errors that could occur within the API. These include
 * error: 404, 400, 401 and 500.
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns error with status code.
 */
const errorHandler = (err, req, res, next) => {
  switch(true) {
    case typeof err === 'string':
      // custom application error
      const is404 = err.toLowerCase().endsWith('not found')
      const statusCode = is404 ? 404 : 400
      return res.status(statusCode).json({ message: err })
    case err.name === 'UnauthorizedError':
      // jwt authentication error
      return res.status(401).json({ message: 'Unauthorized' })
    default:
      return res.status(500).json({ message: err.message })
  }
}

module.exports = errorHandler;
