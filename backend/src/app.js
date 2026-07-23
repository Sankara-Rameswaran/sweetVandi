const express = require('express');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser');
const { authenticate } = require('./middlewares/auth.middleware');
const asyncHandler = require('./middlewares/asyncHandler');
const morganWinston = require('./middlewares/morgon.middleware');
const categoryRoutes = require('./routes/category.routes');
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const rateLimit = require('express-rate-limit');
const app = express();
const compressor = require('compression');
const helmet = require('helmet');
const orderRoutes = require('./routes/order.routes');
const cors = require('cors');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 2,
    message: {
        error: 'Too many requests. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(compressor());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morganWinston);
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);
app.use(errorMiddleware);

app.use(notFoundMiddleware);

module.exports = app;
