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
    if (!validateReq(req.body)) {
      return res.send('incomplete')
    } else if(!validatePassword(req.body)) {
      return res.send('passwords')
    } else {
      User.findOne({
        email: req.body.email
      }, (err, user) => {
        if(user) {
          return res.send('exists')
        } else if (!user) {
          new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
          })
          .save(function(err, user) {
            if (err) {
              res.send(err);
              return;
            }
            res.send(true)
          })
        }
      })
    };
  });

  //login
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({
      userId: req.user._id,
      success: true
    })
  });

  //logout
  router.get('/logout', function(req, res) {
    req.logout();
    res.send(true);
  });

  return router;
}
