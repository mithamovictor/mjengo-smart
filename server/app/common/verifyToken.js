const UsersService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { SECRET } = process.env

/**
 * Function to verify if token is valid or not.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns ok status if valid with message Authorized.
 */
exports.verifyToken = (req, res, next) => {
  const { token } = req?.body;
  if (token === '') return res.status(200).json({
    message: 'UnAuthorized'
  });
  const user = jwt_decode(token);
  if (jwt.verify(token, SECRET)) {
    return UsersService.getById(user?.id)
      .then(user=>{
        if (user)
          return res.status(200).json({
            message: 'Authorized'
          });
        next();
      }).catch(next)
  }
}
