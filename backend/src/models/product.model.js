const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        unit: {
            type: String,
            enum: ['g', 'kg', 'piece', 'box'],
            required: true,
        },
        sellingPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: true },
);

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        images: {
            type: [String],
            default: [],
        },
        variants: [variantSchema],
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

ProductSchema.index({
    name: 'text',
    description: 'text',
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
