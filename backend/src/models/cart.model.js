const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        variantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        quantity: {
            type: Number,
            min: 1,
            default: 1,
            required: true,
        }
    },
    { _id: true, timestamps: false },
);

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [itemSchema],
    },
    { timestamps: true },
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
