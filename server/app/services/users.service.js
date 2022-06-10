require('dotenv').config();
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const bcrypt = require('bcrypt')
const db = require('../../db/models')

module.exports = {
  authenticate,
  getAll,
  getByRole,
  getById,
  getByEmail,
  create,
  update,
  delete: _delete
}

/**
 * @params email, password
 * Authenticate user and generate tokens
 * @returns token,
 */
async function authenticate({ email, password }) {
  const user = await db.Users.findOne({ where: { email } })
  if (!user)
    throw 'User not found'
  if (!(await bcrypt.compare(password, user.hash)))
    throw 'Password is incorrect'
  const userData = {
    id: user.id,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  }
  const token = await jwt.sign(userData, process.env.SECRET, { expiresIn: '1h' })
  const result = { token }
  return result
}

/**
 * List all users
 * @params isPaged, perPage, page
 * @returns users
 */
async function getAll(isPaged, perPage, page) {
  let usersArr = []
  if(isPaged)
    return await db.Users.findAll({ limit: Number(perPage), offset: Number(perPage*page), order: [['id', 'DESC']] })
      .then(users=>{
        users.map(user=>{
          usersArr.push(omitHash(user.dataValues))
        })
        return usersArr
      }).catch(err=>{
        console.warn(err)
      })
  return await db.Users.findAll()
    .then(users=>{
      users.map(user=>{
        usersArr.push(omitHash(user.dataValues))
      })
      return usersArr
    }).catch(err=>{
      console.warn(err)
    })
}

/**
 * Get users by their roles
 * @params role, isPaged, perPage, page
 * @returns users
 */
async function getByRole(role, isPaged, perPage, page) {
  let usersArr = []
  if(isPaged === 'true')
    return await db.Users.findAll({ where: { role }, limit: Number(perPage), offset: Number(perPage*page), order: [['id', 'ASC']] })
      .then(users=>{
        users.map(user=>{
          usersArr.push(omitHash(user.dataValues))
        })
        return usersArr
      }).catch(err=>console.error(err))
  return await db.Users.findAll({ where: { role } })
    .then(users=>{
      users.map(user=>{
        usersArr.push(omitHash(user.dataValues))
      })
      return usersArr
    }).catch(err=>console.err)
}

/**
 * Get single user by their id
 * @params id
 * @returns user
 */
async function getById(id) {
  return await getUser(id)
}

/**
 * List user by email
 * @params email
 * @returns user
 */
async function getByEmail(email) {
	return await db.Users.findOne({ where: { email } })
    .then(user=>{
      return omitHash(user.dataValues)
    }).catch(err=>{
      console.error(err)
    })
}

/**
 * Register a new user to the database
 * @params user
 * @returns user
 */
async function create(params) {
  // validate
  if (await db.Users.findOne({ where: { email: params.email } }))
    throw 'Email "' + params.email + '" is already registered'
  if (params.terms === 'false') {
    throw 'You must accept our terms and conditions to proceed'
  } else {
    params.terms = 1
  }
  // hash password
  if (params.password)
    params.hash = await bcrypt.hash(params.password, 10)
  // save user
  return await db.Users.create(params)
    .then(user=>{
      return user;
    }).catch(err=>console.error(err))
}

/**
 * Update user details
 * @params id, params
 * @returns user
 */
async function update(id, params) {
  const user = await getUser(id)
  // validate
  const emailChanged = params.email && user.email !== params.email;
  if (emailChanged && await db.Users.findOne({ where: { email: params.email } }))
    throw `Email ${params.email} is already taken`;
  // hash password if it was entered
  if (params.password)
    params.hash = await bcrypt.hash(params.password, 10)
  // copy params to user and save
  Object.assign(user, params)
  await user.save()
  return omitHash(user.get())
}

/**
 * Delete user from database
 * @params id
 * @returns
 */
async function _delete(id) {
  const user = await getUser(id)
  await user.destroy()
  return
}

/**
 * Helper function to get user from database by id
 * @params id
 * @returns user
 */
async function getUser(id) {
  const user = await db.Users.findByPk(id)
  if (!user) throw 'User not found'
  return user
}

/**
 * Remove hash from user
 * @params user
 * @returns user
 */
function omitHash(user) {
    const { hash, ...userWithoutHash } = user
    return userWithoutHash
}
