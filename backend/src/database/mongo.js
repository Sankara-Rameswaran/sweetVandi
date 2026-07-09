const mongoose = require('mongoose');
const { mongoUri } = require('../config/app.config');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('DB CONNECTED');
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = connectDB;
