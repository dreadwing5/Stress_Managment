const express =require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


//Home Page
router.get('/',function(req,res){
  res.render('index');
});

//Tips
router.get('/tips',function(req,res){
  res.render('tips');
});

//Quiz
router.get('/game',function(req,res){
  res.render('game');
});

//Result
router.get('/end',function(req,res){
  res.render('end');
});

//Login Page
router.get('/login',function(req,res){
    res.render('login');
});
router.get('/maps',function(req,res){
  res.render('maps');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

//Meditate Page
router.get('/meditate',function(req,res){
  res.render('meditate');
});



module.exports = router;