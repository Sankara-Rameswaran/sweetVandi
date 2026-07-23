const { success } = require('zod');
const {
    placeOrder,
    viewOrder,
    allOrders,
    userOrders,
    updateOrder,
    updateUserOrder,
    cancelOrder,
} = require('../services/order.service');

const placeOrderController = async (req, res) => {
    const userId = req.user._id;
    const response = await placeOrder(userId);
    res.status(200).json({
        success: true,
        message: 'Order placed Successfully!',
        data: response,
    });
};

const viewOrderController = async (req, res) => {
    const user = req.user;
    const orderId = req.params.id;
    const response = await viewOrder(user, orderId);
    res.status(200).json({
        success: true,
        message: 'Order Fetched Successfully',
        data: response,
    });
};

//admin all orders
const viewAllOrders = async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    let filter = {};
    if (req.query.orderStatus) {
        filter.orderStatus = req.query.orderStatus;
    }
    if (req.query.paymentStatus) {
        filter.paymentStatus = req.query.paymentStatus;
    }
    const response = await allOrders(filter, limit, page);
    res.status(200).json({
        success: true,
        message: 'All orders fetched',
        data: response,
    });
};

const cancelOrderController = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user._id;
    const response = await cancelOrder(orderId, userId);
    res.status(200).json({
        success: true,
        message: 'Order Cancelled',
        data: response,
    });
};

const viewUserOrders = async (req, res) => {
    const response = await userOrders(req.user._id);
    res.status(200).json({
        success: true,
        message: 'All orders fetched',
        data: response,
    });
};

const updateOrderController = async (req, res) => {
    const { status } = req.body;
    const orderId = req.params.id;
    const response = await updateOrder(orderId, status);
    res.status(200).json({
        success: true,
        message: 'Order updated!',
        data: response,
    });
};

module.exports = {
    placeOrderController,
    viewOrderController,
    viewAllOrders,
    viewUserOrders,
    updateOrderController,
    cancelOrderController,
};
