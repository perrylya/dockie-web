import express from 'express';
import models from '../src/models/models';
import path from 'path';
import mongoose from 'mongoose';
let User = models;
let router = express.Router()

module.exports = function(passport) {
  router.get('/signup', function(req, res) {
    res.send('signup');
  });

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
    var newUser = new User()
      newUser.email = req.body.email;
      newUser.username = req.body.username;
      newUser.password = req.body.password;
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
  // router.post('/login', passport.authenticate('local', function(err, req, res) {
  //   if(err) {
  //     res.send(err)
  //   }
  //   res.send(true)
  // }));
  //
  // router.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/login');
  // });
  return router;
}
