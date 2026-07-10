const { Router } = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const {
    loginController,
    registerController,
    logoutController,
    refreshController,
} = require('../controllers/auth.controller');

const router = Router();

router.post('/register', asyncHandler(registerController));
router.post('/login', asyncHandler(loginController));
router.post('/refresh', asyncHandler(refreshController));
router.post('/logout', asyncHandler(logoutController));

module.exports = router;
