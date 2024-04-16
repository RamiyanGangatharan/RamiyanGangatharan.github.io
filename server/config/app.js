import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from '../routes';
import usersRouter from '../routes/users';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';
import User from '../models/user';
import * as DBConfig from './db';
let localStrategy = passportLocal.Strategy;
const app = express();
mongoose.connect(DBConfig.URI).then(r => { });
const db = mongoose.connection;
db.on('error', function () {
    console.error("Connection Error");
});
db.once("open", function () {
    console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client")));
app.use(express.static(path.join(__dirname, "../../node_modules")));
app.use(express.static(path.join(__dirname, "../../client")));
app.use(session({
    secret: DBConfig.SessionSecret,
    saveUninitialized: false,
    resave: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
export default app;
//# sourceMappingURL=app.js.map