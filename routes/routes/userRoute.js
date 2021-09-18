const router = require('express').Router();
const controller = require('../../controllers');
const middleware = require('../../middlewares');

router.post('/register', controller.userController.register);
router.post('/login', controller.userController.login);
router.get('/user', middleware.authJwt.verifyToken, controller.userController.getUser);
router.get('/users', [ middleware.authJwt.verifyToken, middleware.roles.isAdmin ], controller.userController.getUsers);
router.put('/update-user', middleware.authJwt.verifyToken, controller.userController.updateUser);

module.exports = router;