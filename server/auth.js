import express from 'express';
let router = express.Router();
import models from '../models/models';
let User = models.User;
import body-parser from 'body-parser';

module.exports = function(passport) {
  // router.get('/signup', function(req, res) {
  //   res.render('signup');
  // });

  var validateReq = function(userData) {
    return (userData.username && userData.password && userData.passwordRepeat);
  };

  var validatePassword = function(userData) {
    return (userData.password === userData.passwordRepeat)
  }

  router.post('/signup', function(err, req, res) {
    console.log('hi')
    if (!validateReq(req.body)) {
      res.send(err)
    } else if(!validatePassword(req.body)) {
      res.send(err)
    }
    var newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    newUser.save(function(err, user) {
      if (err) {
        res.send(err);
        return;
      }
      res.send(true)
    });
  });

  //login
  router.post('/login', passport.authenticate('local') = (err, req, res) => {
    if(err) {
      res.send(err)
    }
    res.send(true)
  }
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });
  return router;
}
