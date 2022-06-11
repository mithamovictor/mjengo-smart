const PostsService = require('../services/posts.services');

/**
 * Create post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.createPost = (req, res, next) => {
  return PostsService.createPost(req.body)
    .then(post=>{
      res.status(200).send({ message: 'Post saved successfully', post });
    }).catch(next)
}

/**
 * Get all posts
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getAllPosts = (req, res, next) => {
  const { isPaged, perPage, page } = req.body;
  return PostsService.getAll(isPaged, perPage, page)
    .then(posts=>{
      res.status(200).send(posts);
    }).catch(next);
}

/**
 * Fetch one post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.getOnePost = (req, res, next) => {
  const { id } = req.params;
  return PostsService.getById(id)
    .then(post=>{
      res.status(200).send(post);
    }).catch(next);
}

/**
 * Update a post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.updatePost = (req, res, next) => {
  const { id } = req.params;
  return PostsService.update(id, req.body)
    .then(post=>{
      res.status(200).send({ message: 'Post updated successfully', post });
    }).catch(next);
}

/**
 * Delete post
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.deletePost = (req, res, next) => {
  const { id } = req.params;
  return PostsService.delete(id)
    .then(()=>{
      res.status(200).send({ message: 'Post deleted successfully' });
    }).catch(next)
}
