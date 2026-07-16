const { addToCart, getCart, updateCart } = require('../services/cart.service');
const addToCartController = async (req, res) => {
    const response = await addToCart(req.user._id, req.body);
    res.status(200).json({
        success: true,
        message: 'Add to cart successful',
        data: response,
    });
};
const getCartController = async (req, res) => {
    const response = await getCart(req.user._id);
    res.status(200).json({
        success: true,
        message: 'Cart fetched successfully!',
        data: response,
    });
};

const updateCartController = async (req, res) => {
    
    const { itemId, action } = req.body;
    const response = await updateCart(req.user._id, itemId, action);
    res.status(200).json({
        success: true,
        message: 'Cart updated successfully',
        data: response,
    });
};
module.exports = { addToCartController, getCartController, updateCartController };
