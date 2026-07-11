const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
