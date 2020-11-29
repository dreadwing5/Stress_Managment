require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

const User = require('./models/User');
//Passport config
require('./config/passport')(passport);
//DB Config
const db = require('./config/keys').MongoURI;

//Connect TO Mongo
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(function () {
        console.log('MongoDB Connected...')
    })
    .catch(function (err) {
        console.log(err);
    })

//Set Templating Engine
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({
    extended: false
}));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash

app.use(flash());

//Global Vars

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Static Folder
app.use(express.static("public"));

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/post'));

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/secrets'
}, (accessToken, refreshToken, profile, cb) => {
    User.findOne({
        googleId: profile.id
    }, (err, user) => {
        if (user) {
            console.log('User was Found');
            cb(null, user)
        } else {
            console.log('No user found, adding new user to DB');
            newUser = new User({
                googleId: profile.id,
                name: profile.name.givenName
            });
            newUser.save(() => {
                console.log('This user is saved');
            });
            cb(null, newUser);
        }
    })
}));

passport.serializeUser(function (user, done) {
    console.log('serializeUser ' + user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//google routes
app.route('/auth/google').get(
    passport.authenticate('google', {
        scope: ['profile']
    })
);

app.get('/auth/google/secrets',
    passport.authenticate('google', {
        successRedirect: '/user-page',
        failureRedirect: '/register'
    }));


//Listen on Port 3000
app.listen(3000, function () {
    console.log('Server ready at Port 3000')
});

module.exports = app;