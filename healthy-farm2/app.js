const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const csrf = require('csurf');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user.route');
const productsRouter = require('./routes/product.route');

const app = express();

// dotenv config
dotenv.config();
require('./config/passport');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use csrf to prevent csurf
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// config to use mdbootstrap
app.use('/mdbootstrap', express.static(path.join(__dirname, '/node_modules/mdbootstrap')))

app.use(session({
  secret: 'nosecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),// resuse mongoose connection
  cookie: { maxAge: 180 * 60 * 1000 } // 180 minutes time life of cookie-session
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf());

// connect to database
mongoose.connect(
  process.env.URI_LOCAL,{
    useNewUrlParser: true
  }
).then((result)=> {
  console.log('connect to database successfully');
}).catch((err)=>{
  console.log(err);
  process.exit();
})

app.use((req, res, next)=> {
  res.locals.user = req.user;
  res.locals.currentPage = '';
  res.locals.session = req.session;
  res.locals._csrf = req.csrfToken();
  next();
})

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
