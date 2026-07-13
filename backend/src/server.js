const dotenv = require('dotenv');
dotenv.config();
const logger = require('../src/config/logger');
const app = require('./app');
const { port } = require('./config/app.config');
const connectDB = require('./database/mongo');

connectDB().then(() => {
    const server = app.listen(port, () => {
        logger.info(`server started ${port}`);
    });
});
