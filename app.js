const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
// const cookieParser = require('cookie-parser');
const cors = require('cors');

//routes
const userRouter = require('./routes/userRoutes');
const gameRouter = require('./routes/gameRoutes');
const contactRouter = require('./routes/contactRoutes');
const discountCodeRouter = require('./routes/discountCodeRoutes');
const commentRouter = require('./routes/commentRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use(cors());

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(express.json());
// app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/games', gameRouter);
app.use('/api/contact', contactRouter);
app.use('/api/discountCode', discountCodeRouter);
app.use('/api/comments', commentRouter);
app.use('/api/payment', paymentRouter);

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

module.exports = app;
