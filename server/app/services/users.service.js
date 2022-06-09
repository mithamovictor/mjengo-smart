require('dotenv').config();
const jwt = require('jsonwebtoken');
// const jwt_decode = require('jwt-decode');
const bcrypt = require('bcrypt');
const Users = require('../../db/models/users.model');
const SECRET = process.env.SECRET;
const tokenList = {};

/**
 * This function authenticates a user
 * @param {*} credentials
 * @returns token and refreshToken
 */
const authenticate = async ({ email, password }) => {
  return await Users.find({ email }).lean()
    .then(user=>{
      if(user.length <= 0) return { notFound: 'User not found!' };
      if(user.length > 0) return bcrypt.compare(password, user[0]?.hash)
        .then(match=>{
          if(!match) return { passwordMismatch: 'Invalid password' };
          const newUserWithV = JSON.parse(JSON.stringify(user[0]))
          const { __v , ...newUser } = newUserWithV;
          const token = jwt.sign({ sub: omitHash(newUser) }, SECRET, { expiresIn: '1h' });
          const refreshToken = jwt.sign({ _id: newUser._id }, SECRET, { expiresIn: '1.5h' });
          const result = { token, refreshToken };
          tokenList[refreshToken] = result;
          return result;
        }).catch(error=>console.error(error));
    }).catch(err=>{
      console.error(err);
    });
}

const getUserById = async (id) => {
  return await Users.findById({ _id: id })
    .then(user=>{
      const newUserWithV = JSON.parse(JSON.stringify(user));
      const { __v , ...newUser } = newUserWithV;
      return omitHash(newUser);
    }).catch(err=>console.error(err));
}

/**
 * This function adds a new user to the database.
 * @param {*} user
 * @returns saved user
 */
const create  = async ({ firstName, middleName, lastName, email, password }) => {
  // Create a hashed password.
  const hash = await bcrypt.hash(password, 10);
  const user = { firstName, middleName, lastName, email, hash };
  return await Users.create(user)
    .then(user=>{ // returns registered user details
      const data = {
        ...user._doc,
        _id: user._doc._id.toString()
      };
      return omitHash(data);
    }).catch(err=>{
      return err;
    });
}

/**
 * This is a function that is used to delete the hash from the returned user object.
 * It copies the user data to a new object called userWithoutHash leaving out the hash.
 * @param {*} user
 * @returns user data without hash
 */
const omitHash = user => {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}


module.exports = {
  authenticate,
  getUserById,
  create,
};
