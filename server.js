const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const connectDB = require('./database/db');
const auth = require("./middleweare/auth");

const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const commentController = require('./controllers/commentController');
const ratingController = require('./controllers/ratingController');
const uploadController = require('./controllers/uploadController')
const responseErrors = require('./middleweare/responseErrors');

connectDB();


const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));



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

app.use(auth());

app.use('/api/auth', userController);
app.use('/api/recipe', recipeController);
app.use('/api/comment', commentController);
app.use('/api/feedback', ratingController);
app.use('/api/upload', uploadController)

app.use(responseErrors());

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
