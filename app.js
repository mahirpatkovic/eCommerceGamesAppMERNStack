const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const contentSecurityPolicy = require('helmet-csp');
const crypto = require('crypto');

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


app.use(
    cors({
        credentials: true,
        origin:
            process.env.NODE_ENV === 'production'
                ? 'http://msgames.herokuapp.com'
                : 'http://localhost:3000',
    })
);

// app.options('*', cors());

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     res.locals.nonce = crypto.randomBytes(16).toString('hex');
//     next();
// });

// // app.use(
// //     contentSecurityPolicy({
// //         useDefaults: true,
// //         directives: {
// //             defaultSrc: ["'self'"],
// //             scriptSrc: [
// //                 "'self'",
// //                 'https://www.paypal.com',
// //                 'sha256-9Y44qF+1Rwj+2hgGsDeCkCPIpHrOBnzI31v0UCQYbfc=',
// //                 // `'nonce-${crypto.randomBytes(16).toString('hex')}'`,
// //             ],
// //             fontSrc: ["'self'", 'https://fonts.googleapis.com'],
// //             objectSrc: ["'none'"],
// //             upgradeInsecureRequests: [],
// //         },
// //         reportOnly: false,
// //     })
// // );

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
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/games', gameRouter);
app.use('/api/contact', contactRouter);
app.use('/api/discountCode', discountCodeRouter);
app.use('/api/comments', commentRouter);
app.use('/api/payment', paymentRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

module.exports = app;
