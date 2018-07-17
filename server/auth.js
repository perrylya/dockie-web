import express from 'express';
import models from '../models/models';
import bodyParser from 'body-parser';
import path from 'path';
let app = express();
import mongoose from 'mongoose';
let User = models.User;

mongoose.connection.on('connected', () =>{
  console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) =>{
  console.log('log:' + err);
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

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

  ao.post('/signup', function(err, req, res) {
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
