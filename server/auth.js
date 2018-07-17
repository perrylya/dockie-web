import express from 'express';
let router = express.Router();
import models from '../models/models';
let User = models.User;

module.exports = function(passport) {
  router.get('/signup', function(req, res) {
    res.render('signup');
  });

  var validateReq = function(userData) {
    return (userData.username && userData.password && userData.passwordRepeat);
  };

  var validatePassword = function(userData) {
    return (userData.password === userData.passwordRepeat)
  }

  router.post('/signup', function(req, res) {
    if (!validateReq(req.body)) {
      return res.render('signup', {
        error: "Please complete all the fields."
      });
    } else if(!validatePassword(req.body)) {
      return res.render('signup', {
        error: "Passwords must match."
      });
    }
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save(function(err, user) {
      if (err) {
        res.status(500).redirect('/register');
        return;
      }
      res.redirect('/login');
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
