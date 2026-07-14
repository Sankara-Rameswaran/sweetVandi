const { Router } = require('express');
const asyncHandler = require('../middlewares/asyncHandler');
const {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    partialUpdateCategory,
    deleteCategory,
} = require('../controllers/category.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const router = Router();

router.get('/', asyncHandler(getCategories));
router.post(
    '/',
    authenticate,
    authorize('admin'),
    upload.single('image'),
    asyncHandler(createCategory),
);
router.get('/:id', asyncHandler(getCategoryById));

router.put('/:id', authenticate, authorize('admin'), asyncHandler(updateCategory));

router.patch(
    '/:id',
    authenticate,
    authorize('admin'),
    upload.single('image'),
    asyncHandler(partialUpdateCategory),
);

router.delete('/:id', authenticate, authorize('admin'), asyncHandler(deleteCategory));

module.exports = router;
