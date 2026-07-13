const express = require('express');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser');
const { authenticate } = require('./middlewares/auth.middleware');
const asyncHandler = require('./middlewares/asyncHandler');

const categoryRoutes = require('./routes/category.routes');
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);

// For testing
// app.get(
//     '/api/v1/profile',
//     authenticate,
//     asyncHandler((req, res) => {
//         res.status(200).json({
//             success: true,
//             data: req.user,
//         });
//     }),
// );

app.use(errorMiddleware);

app.use(notFoundMiddleware);

module.exports = app;
