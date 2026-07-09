const { Router } = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const { loginController, registerController } = require('../controllers/auth.controller');

const router = Router();

router.post('/register', asyncHandler(registerController));
router.post('/login', asyncHandler(loginController));

module.exports = router;
