const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

const placeOrder = async (userId) => {
    // Find user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    if (cart.items.length === 0) {
        throw new ApiError(400, 'Cart is empty');
    }

    // Create order items
    const formattedItems = await Promise.all(
        cart.items.map(async (item) => {
            const product = await Product.findById(item.productId);

            if (!product) {
                throw new ApiError(404, 'Product not found');
            }

            const variant = product.variants.find((v) => v._id.equals(item.variantId));

            if (!variant) {
                throw new ApiError(404, 'Variant not found');
            }

            return {
                productId: product._id,
                productName: product.name,
                variant: {
                    label: variant.label,
                    quantity: variant.quantity,
                    unit: variant.unit,
                },
                quantity: item.quantity,
                price: variant.sellingPrice,
                subtotal: variant.sellingPrice * item.quantity,
            };
        }),
    );

    // Calculate total amount
    const totalAmount = formattedItems.reduce((total, item) => total + item.subtotal, 0);

    // Create order
    const order = await Order.create({
        user: userId,
        items: formattedItems,
        totalAmount,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    return order;
};

const viewOrder = async (user, orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new ApiError(404, 'Order not found');
    if (user.role == 'admin' || user._id.equals(order.user)) {
        return order;
    } else {
        throw new ApiError(403, 'Forbidden');
    }
};

const allOrders = async (filter, limit, page) => {
    const orders = await Order.find(filter).limit(limit).skip(0);
    return orders;
};

const userOrders = async (userId) => {
    const orders = await Order.find({ user: userId }).sort({ updatedAt: -1 });
    return orders;
};

const updateOrder = async (orderId, status) => {
    const order = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
        { returnDocument: 'after' },
    );
    if (!order) throw new ApiError(404, 'Order not found');
    return order;
};

const updateUserOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new ApiError(404, 'Order not Found');
};

const cancelOrder = async (orderId, userId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new ApiError(404, 'Order not Found');
    if (!order.user.equals(userId)) throw new ApiError(403, 'FORBIDDEN');
    if (order.orderStatus == 'PENDING' || order.orderStatus == 'CONFORMED')
        order.orderStatus = 'CANCELLED';
    else throw new ApiError(403, 'CANCELATION IS NOT ALLOWED ONCE STARTED PREPARING');

    await order.save();
    return order;
};

module.exports = {
    placeOrder,
    viewOrder,
    allOrders,
    userOrders,
    updateOrder,
    cancelOrder,
};
