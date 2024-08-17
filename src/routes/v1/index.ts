import express from 'express';
import UserController from '../../controllers/user-controller';

const router = express.Router();

router.post('/signup', UserController.create);
router.post('/signin', UserController.signIn);
router.get('/isAuthenticated', UserController.isAuthenticated);
router.get('/isVerified/:token', UserController.isVerified);
router.get('/userProfile/:userId', UserController.userProfile);

export default router;
