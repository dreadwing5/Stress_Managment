const express = require('express');
const router = express.Router();
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcryptjs');
//User Model
const User = require('../models/User');
//Login Page
router.get('/login', function (req, res) {
    res.render('Login');
});

//Register Page 
router.get('/register', function (req, res) {
    res.render('register');
});

//Register Handle
router.post('/register', function (req, res) {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    let errors = [];

    //Check Required Fields
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: 'Please fill in all fields'
        });
    }

    //Check Passwords match
    if (password !== password2) {
        errors.push({
            msg: 'Passwords do not match'
        });
    }

    //Check Password Length
    if (password.length < 6) {
        errors.push({
            msg: "Password should be atleast 6 characters long"
        });
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            password,
            password2
        });

    } else {
        //Validation Passes
        User.findOne({
                email: email
            })
            .then(function (user) {
                if (user) {
                    //User Exists
                    errors.push({
                        msg: 'Email is already registered'
                    })
                    res.render('register', {
                        errors,
                        name,
                        password,
                        password2
                    });

                } else {
                    const newUser = new User({
                        name,
                        email,
                        password,
                    });

                    //Hash Password
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(newUser.password, salt, function (err, hash) {
                            if (err) throw err;
                            //Set Password to hashed
                            newUser.password = hash;
                            //Save User
                            newUser.save()
                                .then(function (user) {
                                    req.flash('success_msg', 'You are now registerd and can login');
                                    res.redirect('/login');
                                })
                                .catch(function (err) {
                                    console.log(err);
                                })
                        })

                    })

                }
            })

    }

});
//Login Handle
router.post('/login', (req, res,next) => {
    passport.authenticate('local', {
        successRedirect: '/user-page',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);

});

//Logout Handle
router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg','You are logged out');
    res.redirect('/login');
})


module.exports = router;