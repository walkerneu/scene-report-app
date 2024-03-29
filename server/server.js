const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const genresRouter = require('./routes/genres.router');
const uploadRouter = require('./routes/upload.router');
const eventRouter = require('./routes/event.router');
const searchRouter = require('./routes/search.router');
const commentRouter = require('./routes/comment.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/genres', genresRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/event', eventRouter);
app.use('/api/search', searchRouter);
app.use('/api/comments', commentRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});