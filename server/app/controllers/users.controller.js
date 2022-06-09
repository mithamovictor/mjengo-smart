const UsersService = require('../services/users.service');

/**
 * Register a new user.
 * This function registers a new user to the database with the email being the
 * unique identifier.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns user
 */
exports.registerUser = (req, res, next) => {
  return UsersService.create(req.body)
    .then(user=>{
      if(user.keyValue?.email)
        return res.status(403).json({
          status: 'failed',
          message: 'User is already registered!',
        });
      return res.status(201).json({
        status: 'success',
        message: 'User registered successfully!',
        user
      })
    }).catch(next);
};

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
      return res.status(200).json(result);
    }).catch(next);
};

/**
 * Get user profile by user id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns user
 */
exports.getProfile = (req, res, next) => {
  // we receive the id in the request
  const { id } = req?.query;
  return UsersService.getUserById(id)
    .then(user=>{
      return res.status(200).send(user);
    }).catch(next);
};
