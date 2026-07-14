const { Router } = require('express');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const asyncHandler = require('../middlewares/asyncHandler');
const {
    createProductController,
    getProductsController,
    productById,
    updateProductController,
    deleteProductController,
    postImageController,
    deleteImageController,
    createVariantController,
    deleteVariantController,
} = require('../controllers/product.controller');

const router = Router();

router.post(
    '/',
    authenticate,
    authorize('admin'),
    upload.array('images', 5),
    asyncHandler(createProductController),
);

router.get('/', asyncHandler(getProductsController));

router.get('/:id', asyncHandler(productById));

router.patch('/:id', authenticate, authorize('admin'), asyncHandler(updateProductController));

router.delete('/:id', authenticate, authorize('admin'), asyncHandler(deleteProductController));

router.post(
    '/:id/images',
    upload.array('images'),
    authenticate,
    authorize('admin'),
    asyncHandler(postImageController),
);

router.delete('/:id/images', authenticate, authorize('admin'), asyncHandler(deleteImageController));

router.post(
    '/:id/variant',
    authenticate,
    authorize('admin'),
    asyncHandler(createVariantController),
);

router.delete(
    '/:productId/variant/:variantId',
    authenticate,
    authorize('admin'),
    asyncHandler(deleteVariantController),
);

module.exports = router;
