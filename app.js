require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');

const app = express();

// DataBase
const connectDB = require('./server/config/db');

connectDB();

//Middlewares

app.use(session({
    secret: 'keyboard cat',
    resave:  false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    }),
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(flash());

// Express ejs Layouts

app.use(expressLayouts);
app.set('layout', './layouts/main');

// Template engine

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/admin'));
app.use('/', require('./server/routes/main'));

app.listen(7000, () => {
    console.log('running');
});