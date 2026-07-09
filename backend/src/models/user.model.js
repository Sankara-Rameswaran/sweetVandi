const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
