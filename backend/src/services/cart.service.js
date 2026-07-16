const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { getProductById } = require('./product.service');

const addToCart = async (userId, data) => {
    const { productId, variantId, quantity } = data;

    const product = await getProductById(productId);

    const variant = product.variants.find((variant) => variant._id == variantId);

    if (!variant) throw new ApiError(404, 'Variant not found');

    const cart = await Cart.findOne({ user: userId });

    const item = { productId, variantId, quantity };

    if (cart) {
        const existingItem = cart.items.find(
            (item) => item.productId == productId && item.variantId == variantId,
        );
        if (existingItem) {
            if (existingItem.quantity + quantity > variant.stock)
                throw new ApiError(409, 'Stock not available ');
            existingItem.quantity += quantity;
        } else {
            cart.items.push(item);
        }

        return await cart.save();
    } else {
        const cart = { user: userId, items: [item] };
        return await Cart.create(cart);
    }
};

const getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate(
        'items.productId',
        'name images category variants',
    );
    if (!cart)
        return {
            items: [],
            summary: {
                totalItems: 0,
                grandTotal: 0,
            },
        };
    let grandTotal = 0;
    let totalItems = 0;

    const items = cart.items.map((item) => {
        const product = item.productId;
        const variant = product.variants.find((variant) => variant._id.equals(item.variantId));
        const subtotal = variant.sellingPrice * item.quantity;

        grandTotal += subtotal;
        totalItems += item.quantity;
        return {
            itemId: item._id,
            product: {
                id: product._id,
                name: product.name,
                image: product.images[0],
                category: product.category,
            },
            variant: {
                id: variant._id,
                label: variant.label,
                quantity: variant.quantity,
                unit: variant.unit,
                price: variant.price,
            },
            quantity: item.quantity,
            subtotal,
        };
    });

    return {
        items,
        summary: {
            totalItems,
            grandTotal,
        },
    };
};

const updateCart = async (userId, itemId, action) => {
    const cart = await Cart.findOne({ user: userId });

    const item = cart.items.find((i) => i._id.equals(itemId));

    if (!item) throw new ApiError(404, 'Item not found in cart!');

    if (action == 'inc') {
        item.quantity += 1;
    } else if (action == 'dec') {
        if (item.quantity == 1) {
            cart.items = cart.items.filter((i) => i._id != item._id);
        } else item.quantity -= 1;
    } else if (action == 'clr') {
        cart.items = cart.items.filter((i) => i._id != item._id);
    } else {
        throw new ApiError(409, 'Invalid Operation in cart!');
    }
    cart.save();
    return cart;
};

module.exports = { addToCart, getCart, updateCart };
