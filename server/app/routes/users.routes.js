const SchemaMiddleware = require('../middleware/schema.middleware');
const UsersController = require('../controllers/users.controller');
const TokenVerifier = require('../common/verifyToken');


exports.routesConfig = app => {
  app.post('/api/register', [
    SchemaMiddleware.registerUserSchema,
    UsersController.registerUser,
  ]);
  app.post('/api/authenticate', [
    SchemaMiddleware.authenticateUserSchema,
    UsersController.authenticateUser,
  ]);
  app.get('/api/profile', [
    UsersController.getProfile,
  ]);
  app.post('/api/verifyToken', [
    TokenVerifier.verifyToken
  ])
};
