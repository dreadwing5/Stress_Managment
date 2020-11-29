const express =require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


//Home Page
router.get('/',function(req,res){
  res.render('index');
});


//Quiz
router.get('/game',function(req,res){
  res.render('game');
});


//Maps
router.get('/nearby-hospitals',function(req,res){
  res.render('maps');
});


//Meditate Page
router.get('/meditate',function(req,res){
  res.render('meditate');
});

// Result page
router.get('/result',function(req,res) {
  res.render('result');
});

module.exports = router;
