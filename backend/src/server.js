const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { port } = require('./config/app.config');
const connectDB = require('./database/mongo');

connectDB().then(() => {
    const server = app.listen(port, () => {
        console.log(`Server started on PORT -> ${port}`);
    });
});
