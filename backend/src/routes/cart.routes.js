const { Router } = require('express');
const { authenticate } = require('../middlewares/auth.middleware');
const asyncHandler = require('../middlewares/asyncHandler');
const {
    addToCartController,
    getCartController,
    updateCartController,
} = require('../controllers/cart.controller');

const router = Router();

router.post('/', authenticate, asyncHandler(addToCartController));

router.get('/', authenticate, asyncHandler(getCartController));

router.patch('/', authenticate, asyncHandler(updateCartController));

module.exports = router;
