const SchemaMiddleware = require('../middleware/schema.middleware');
const PostsController = require('../controllers/posts.controller');


exports.routesConfig = app => {
  app.post('/api/createPost', [
    SchemaMiddleware.postSchema,
    PostsController.createPost
  ]);
  app.get('/api/getAllPosts', [
    PostsController.getAllPosts
  ]);
  app.get('/api/getPost', [
    PostsController.getOnePost
  ]);
  app.put('/api/updatePost/:id', [
    PostsController.updatePost
  ]);
  app.delete('/api/deletePost/:id', [
    PostsController.deletePost
  ]);
};
