import createError from 'http-errors';
import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose'

import indexRouter from '../routes';
import usersRouter from '../routes/users';

import session from 'express-session'; // cookie-based session
import passport from 'passport'; // authentication support
import passportLocal from 'passport-local'; // authentication strategy [BASIC AUTH]
import flash from 'connect-flash'; // authentication messaging
import User from '../models/user';
import * as DBConfig from './db'

let localStrategy = passportLocal.Strategy;

const app = express();

mongoose.connect(DBConfig.URI).then(r => {});
const db = mongoose.connection;

db.on('error', function () {
    console.error("Connection Error")
});

db.once("open", function () {
    console.log(`Connected to MongoDB at ${DBConfig.HostName}`)
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../../client")));        // server static files from client directory
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

/**
 * HACK FOR User.serializeUser():
 *
 * node_modules --> @types --> passport
 *
 * line 468 (Express.user --> any)
 *
 * modified the datatype to any.
 */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err: createError.HttpError, req: express.Request,
                  res: express.Response, next: NextFunction): void {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
