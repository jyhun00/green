var express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
//const kakao_passport = require('./config/kakao-passport.js')
const common = require('./util/common');
const passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/auth');
var postRouter = require('./routes/post');
var brandRouter = require('./routes/brand');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post',postRouter);
app.use('/brand',brandRouter);



module.exports = app;
