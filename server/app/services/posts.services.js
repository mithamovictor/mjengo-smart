const db = require('../../db/models')

module.exports = {
  getAll,
  getById,
  createPost,
  update,
  delete: _delete
}

/**
 * Get all posts
 * @param {isPaged, perPage, page} params
 * @returns
 */
async function getAll(isPaged, perPage, page) {
  if(isPaged)
    return await db.Posts.findAll({ limit: Number(perPage), offSet: Number(perPage*page), order: [['id', 'ASC']] })
      .then(posts=>{
        return posts
      }).catch(err=>{
        console.warn(err)
      })

  return await db.Posts.findAll()
    .then(posts=>{
      return posts
    }).catch(err=>{
      console.log(err)
    })
}

/**
 * Get by ID
 * @param {*} id
 * @returns
 */
async function getById(id) {
  const post = await db.Posts.findByPk(id)
  if(!post) return 'Appointment not found'
  return post
}

/**
 * Create a new post
 */
async function createPost(params) {
  return await db.Posts.create(params)
    .then(post=>{
      return post;
    }).catch(err=>console.error(err));
}

/**
 * Update post
 * @param {*} id
 * @param {*} params
 * @returns
 */
async function update(id, params) {
  const post = await getById(id)
  Object.assign(post, params)
  await post.save()
  return post.get()
}

/**
 * Delete Appointment
 */
async function _delete(id) {
  const post = await getById(id)
  await post.destroy()
  return
}
