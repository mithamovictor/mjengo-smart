/**
 * Function to verify if token is valid or not.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns ok status if valid with message Authorized.
 */
exports.verifyToken = (req, res, next) => {
  return res.status(200).json({
    message: 'Authorized'
  })
}
