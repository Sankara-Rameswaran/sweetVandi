const ApiError = require('../utils/ApiError');
const Product = require('../models/product.model');
const { deleteFile, deleteFiles } = require('../utils/file');
const createProduct = async (product) => {
    const isExists = await Product.findOne({ name: product.name });
    if (isExists) throw new ApiError(409, 'Already Product exists');
    product = await Product.create(product);
    return product;
};

const getProducts = async (page, limit, filter) => {
    const offset = limit * (page - 1);
    const products = await Product.find(filter)
        .populate('category', 'name')
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 });
    const totalProducts = await Product.countDocuments(filter);
    return {
        products,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            limit,
        },
    };
};

const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new ApiError(404, 'Product not found');
    return product;
};

const deleteProduct = async (id) => {
    const product = await updateProduct(id, { isAvailable: false });
    return product;
};

const updateProduct = async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data, { returnDocument: 'after' });
    return product;
};

const postImage = async (id, images) => {
    const product = await getProductById(id);
    if (product.images.length + images.length > 5) {
        await deleteFiles(images);
        throw new ApiError(409, 'Cant add more than 5 images');
    }
    product.images.push(...images);
    await product.save();
    return product;
};

const deleteImage = async (id, images) => {
    const product = await getProductById(id);
    if (!product) throw new ApiError(404, 'product not found');
    const imageExists = images.every((image) => product.images.includes(image));

    if (!imageExists) {
        throw new ApiError(404, 'One or more images not found.');
    }

    if (product.images.length === images.length) {
        throw new ApiError(400, 'A product must have at least one image.');
    }
    product.images = product.images.filter((image) => !images.includes(image));
    await product.save();
    await deleteFiles(images);
    return product;
};

const createVariant = async (id, data) => {
    const product = await getProductById(id);
    if (!product) throw new ApiError(404, 'Product not found');
    for (const variant of product.variants) {
        if (variant.unit == data.unit && variant.quantity == data.quantity) {
            throw new ApiError(409, 'Variant Already Exists');
        }
    }
    product.variants.push(data);
    await product.save();
    return product;
};

const deleteVariant = async (productId, variantId) => {
    const product = await getProductById(productId);
    if (!product) throw new ApiError(404, 'Product not Found');
    product.variants = product.variants.filter((varaint) => varaint._id != variantId);
    await product.save();
    return product;
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    postImage,
    deleteImage,
    createVariant,
    deleteVariant,
};
