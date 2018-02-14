const express = require('express');
const passport = require('passport');
const Users = require('../models/users');
const bodyParser = require('body-parser');
const jwtKey = process.env.JWT;
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const authenticate = require('../authenticate.js');


const router = new express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


/*
router.post('/signup', (req,res) => {
    Users.register(new Users({
      username: req.body.username,
      name: req.body.name}),
      req.body.password, (err, user) => {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    user.save((err, user) => {
      passport.authenticate('local')(req,res, () => (
        res.status(200).json({message: 'Sign up successfull!'})
      ));
    });
  });
                 

});
*/

router.post('/signup', authenticate.register);
router.post('/login', authenticate.login);
/*
router.post('/login',(req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err){
      return next(err);
    }
    if(!user) {
      return res.status(401).json({
        message: 'Incorrect information'
      })
      }
    req.logIn(user, err => {
      if(err){
        return res.status(500).json({
          message: err.message
        });
      }
      
      //generate JWT
      let token = jwt.sign(user.toJSON(), jwtKey, {
        expiresIn: 3600
      });
      
      //store token as cookie (httpOnly and HTTPS secure to prevent xss)
      res.cookie('isLoggedin', true);
      res.cookie('jwt', token, {httpOnly: true, secure: true});
      res.cookie('user', user, {httpOnly: true, secure: true});
      
      
      res.status(200).json({
        message: 'Login Successfull',
        success: true,
        token: token,
        user: user
      });
    });
  })(req,res,next);
});
*/
router.get('/logout', function(req,res){
  req.logout();
  res.clearCookie('jwt');
  res.clearCookie('user');
  res.clearCookie('isLoggedin');
  res.status(200).json({
    message: 'Logout Successfull!'
  });
  
});

let authUser = function(req,res,next){
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtKey, function(err,decoded){
      if (err) {
        return res.json({success: false, message: 'failed to authenticate token.'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'You muse be logged in to see this page.'
    });
  }
}

router.get('/secret', authUser, function(req,res){
  res.send(req.decoded);
})


module.exports=router;