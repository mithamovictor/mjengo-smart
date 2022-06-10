const db = require('../../db/models');

module.exports = {
  getAll,
  getById
}

/**
 * List all roles
 * @returns roles
 */
async function getAll() {
  return await db.Roles.findAll()
}

/**
 * Get single user by their id
 * @params id
 * @returns role
 */
 async function getById(id) {
  return await getRole(id)
}

/**
 * Helper function to get user from database by id
 * @params id
 * @returns user
 */
async function getRole(id) {
  const role = await db.Roles.findByPk(id)
  if (!role) throw 'Role not found'
  return role
}
