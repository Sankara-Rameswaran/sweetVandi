const { Router } = require('express');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const {
    placeOrderController,
    viewOrderController,
    viewAllOrders,
    viewUserOrders,
    updateOrderController,
    cancelOrderController,
} = require('../controllers/order.controller');
const asyncHandler = require('../middlewares/asyncHandler');

const router = Router();

router.post('/', authenticate, asyncHandler(placeOrderController));
router.get('/', authenticate, authorize('admin'), asyncHandler(viewAllOrders));
router.get('/all', authenticate, asyncHandler(viewUserOrders));
router.get('/cancel/:id', authenticate, asyncHandler(cancelOrderController));
router.get('/:id', authenticate, asyncHandler(viewOrderController));
router.patch('/:id', authenticate, authorize('admin'), asyncHandler(updateOrderController));
module.exports = router;
