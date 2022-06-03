const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const connectDB = require('./database/db');

const userController = require('./controllers/userController');

connectDB();

 
const app = express();
app.use(express.json());

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(cors());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 300,
});
app.use(limiter);

app.use('/api/auth', userController);

const PORT = process.env.PORT || 5001;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
