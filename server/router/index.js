const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const folderController = require('../controllers/folder-controller');
const postController = require('../controllers/post-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

router.post('/folder/add/', folderController.add);
router.post('/folder/remove/', folderController.remove);
router.post('/folder/set/', folderController.set);
router.get('/folder/get/', folderController.getFolders);

router.post('/post/add/', postController.add);
router.post('/post/remove/', postController.remove);
router.post('/post/set/', postController.set);
router.get('/post/get/', postController.getPosts);

module.exports = router
