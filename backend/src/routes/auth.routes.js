const { Router } = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const {
    loginController,
    registerController,
    logoutController,
    refreshController,
    getMe,
} = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = Router();

router.post('/register', asyncHandler(registerController));
router.post('/login', asyncHandler(loginController));
router.post('/refresh', asyncHandler(refreshController));
router.post('/logout', asyncHandler(logoutController));
router.get('/me', authenticate, getMe);
module.exports = router;
