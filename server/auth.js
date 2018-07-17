import express from 'express';
import models from '../src/models/user';
import path from 'path';
import mongoose from 'mongoose';
let User = models;
let router = express.Router()

module.exports = function(passport) {
  //registration
  var validateReq = function(userData) {
    return (userData.username && userData.password && userData.passwordRepeat);
  };

  var validatePassword = function(userData) {
    return (userData.password === userData.passwordRepeat)
  }

  router.post('/signup', function(req, res) {
    console.log(req.body)
    if (!validateReq(req.body)) {
      return res.send('err')
    } else if(!validatePassword(req.body)) {
      return res.send('err')
    } else {
      var newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      })
      newUser.save(function(err, user) {
        if (err) {
          res.send(err);
          return;
        }
        res.send(true)
      })
    };
  });

  //login
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/getuser')
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  router.get('/getuser', (req, res) => {
    if(!req.user) {
      throw error
    } else {
      res.send(req.user)
    }
  })
  return router;
}
