const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')


const app =express();
//Passport config
require('./config/passport')(passport);
//DB Config
const db = require('./config/keys').MongoURI;

//Connect TO Mongo
mongoose.connect(db,{useNewUrlParser:true})
.then(function(){
    console.log('MongoDB Connected...')
})
.catch(function(err){
    console.log(err);
})

//Set Templating Engine
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}));

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

app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Static Folder
app.use(express.static("public"));

// Routes
app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));



//Listen on Port 3000
app.listen(3000,function(){
    console.log('Server ready at Port 3000')
});