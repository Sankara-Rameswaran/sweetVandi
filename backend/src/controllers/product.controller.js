const {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    postImage,
    deleteImage,
    createVariant,
    deleteVariant,
} = require('../services/product.service');
const { extractPaths } = require('../utils/imagePathExtractor');
const logger = require('../config/logger');
const { response } = require('express');

const createProductController = async (req, res) => {
    const userId = req.user._id;
    var data = { ...req.body, createdBy: userId };
    if (req.files) {
        const images = extractPaths(req.files);
        data = { ...data, images };
    }
    const response = await createProduct(data);
    logger.info(`Product '${response.name}' created by ${req.user.firstName} ${req.user.lastName}`);
    res.status(200).json({
        success: true,
        message: 'Product created Successfully!',
        data: response,
    });
};

const getProductsController = async (req, res) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const filter = {};

    if (req.query.search) {
        filter.$or = [
            {
                name: {
                    $regex: req.query.search,
                    $options: 'i',
                },
            },
        ];
    }

    const response = await getProducts(page, limit, filter);
    res.status(200).json({
        success: true,
        message: 'Products feteched Successfully',
        data: response,
    });
};

const productById = async (req, res) => {
    const id = req.params.id;
    const response = await getProductById(id);
    res.status(200).json({
        success: true,
        message: 'Product fetched',
        data: response,
    });
};

const deleteProductController = async (req, res) => {
    const id = req.params.id;
    const response = await deleteProduct(id);
    res.status(200).json({
        success: true,
        message: 'Product deleted',
        data: response,
    });
};

const updateProductController = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const response = await updateProduct(id, data);
    res.status(200).json({
        success: true,
        message: 'Product Updated',
        data: response,
    });
};

const postImageController = async (req, res) => {
    const id = req.params.id;
    const images = extractPaths(req.files);
    const response = await postImage(id, images);
    res.status(200).json({
        success: true,
        message: 'Images uploaded',
        data: response,
    });
};

const deleteImageController = async (req, res) => {
    const id = req.params.id;
    const images = req.body.images;
    const response = await deleteImage(id, images);
    res.status(200).json({
        success: true,
        message: 'Image Deleted',
        data: response,
    });
};

const createVariantController = async (req, res) => {
    const id = req.params.id;
    const response = await createVariant(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Variant has been added!',
        data: response,
    });
};

const deleteVariantController = async (req, res) => {
    const { productId, variantId } = req.params;
    const response = await deleteVariant(productId, variantId);
    res.status(200).json({
        success: true,
        message: 'Variant deleted successfully',
        data: response,
    });
};

module.exports = {
    createProductController,
    getProductsController,
    productById,
    updateProductController,
    deleteProductController,
    postImageController,
    deleteImageController,
    createVariantController,
    deleteVariantController,
};
