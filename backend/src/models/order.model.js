const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    variant: {
        label: String,
        quantity: Number,
        unit: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            requried: true,
        },
        items: [itemSchema],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        orderStatus: {
            type: String,
            enum: [
                'PENDING',
                'CONFORMED',
                'PROCESSING',
                'OUT FOR DELIVERY',
                'DELIVERED',
                'CANCELLED',
            ],
            default: 'PENDING',
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['PENDING', 'PAID', 'FAILED'],
            default: 'PENDING',
        },
    },
    { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
