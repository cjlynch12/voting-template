const passport = require('passport');
const Users = require('./models/users');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT;
const mongoose = require('mongoose');
const User = mongoose.model('User');

function genToken(user, res) {
  let token = jwt.sign(user.toJSON(), jwtKey, {
    expiresIn: 3600
  });
  
  res.cookie('isLoggedin', true);
  res.cookie('jwt', token, {httpOnly: true, secure: true});
  res.cookie('user', user, {httpOnly: true, secure: true});
  return token;
}

module.exports.register = function(req,res) {
  let user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = user.generateHash(req.body.password);
  user.save((err) => {
    if (err) {
      if (err.code === 11000) {
          return res.status(500).send({message: 'User already exist!'});
    }
      return res.status(500).send({message: err});
    }
    let jwtToken = genToken(user, res);
    res.status(200).json({
      message: 'Sign up successfull!',
      success: true,
      token: jwtToken,
      user: user
    })
  })
}

module.exports.login = function(req,res) {
passport.authenticate('local', (err, user, info) => {
  
    if(err) {
       res.status(404).json({message : err});
       return;
    }
  
    if(user){
      
      /*
      //generate JWT
        let token = jwt.sign(user.toJSON(), jwtKey, {
          expiresIn: 3600
        });
    
      //store token as cookie (httpOnly and HTTPS secure to prevent xss)
      res.cookie('isLoggedin', true);
      res.cookie('jwt', token, {httpOnly: true, secure: true});
      res.cookie('user', user, {httpOnly: true, secure: true});
      */
      let jwtToken = genToken(user, res);
      
      res.status(200).json({
        message: 'Login Successfull',
        success: true,
        token: jwtToken,
        user: user
      });
    } else {
      res.status(401).json(info);
    }
  
  })(req,res);
  
};
