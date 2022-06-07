const UsersService = require('../services/users.service');

/**
 * Register a new user.
 * This function registers a new user to the database with the email being the
 * unique identifier.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns registered user
 */
exports.registerUser = (req, res, next) => {
  return UsersService.create(req.body)
    .then(user=>{
      if(user.keyValue?.email)
        return res.status(403).json({
          message: 'User is already registered!',
        });
      return res.status(201).json({
        message: 'User registered successfully!',
        user
      })
    }).catch(next);
}

/**
 * Authenticate User
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns token and refreshToken
 */
exports.authenticateUser = (req, res, next) => {
  return UsersService.authenticate(req.body)
    .then(result=>{
      if (result?.notFound) return res.status(404).json(result)
      if (result?.passwordMismatch) return res.status(403).json(result);
      res.status(200).json(result);
    }).catch(next);
}
