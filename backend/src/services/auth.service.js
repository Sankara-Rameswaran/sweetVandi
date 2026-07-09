const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const ApiError = require('../utils/ApiError');

const registerUser = async (user) => {
    const isExists = await User.findOne({ email: user.email });
    if (isExists) throw new ApiError(409, 'Account Already Exists');

    const hashedPassword = await bcrypt.hash(user.password, 12);

    const newUser = { ...user, password: hashedPassword };
    return await User.create(newUser);
};

const loginUser = async (user) => {
    const userData = await User.findOne({ email: user.email }).select('+password');

    if (!userData) throw new ApiError(404, 'Account not exists');

    const isValid = await bcrypt.compare(user.password, userData.password);

    if (!isValid) throw new ApiError(401, 'Wrong Credentials');

    return userData;
};

module.exports = { registerUser, loginUser };
