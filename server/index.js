import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
let app = express();
import session from 'express-session';
import routes from './auth.js';
import mongoose from 'mongoose';
import LocalStrategy from 'passport-local'
const Strategy = LocalStrategy.Strategy;
import passport from './passport'
var MongoStore = require('connect-mongo')(session);
import User from '../src/models/user';
import Document from '../src/models/document'
import socketIO from 'socket.io'
import http from 'http'

const server = http.Server(app)
const io = socketIO(server)

mongoose.connection.on('connected', () =>{
  console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) =>{
  console.log('log:' + err);
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport Implementation
app.use(session({
  secret: 'yer',
  store: new MongoStore({mongooseConnection: require('mongoose').connection})
}));

app.use(passport.initialize());
app.use(passport.session());

//All other server route endpoints
app.use('/', routes(passport));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/users', (req, res) => {
  User.find().then(users => res.send(users))
})

//app.get('/docs')

// io.on('connection', function (socket) {
//   socket.on('getDocuments', (data, next) => {
//     Doc.find({
//       collabs: {$in: socket._activeUser.id}
//     }, (err, docs) => next({err, docs}))
//   })
// })


// app.post('/savedoc', (req, res) => {
//   var newDoc = new Document({
//     creator: req.body.creator,
//     collabs: req.body.collabs,
//     content: req.body.content,
//     password: req.body.password,
//     title: req.body.title
//   })
//   newDoc.save(function(err, user) {
//     if (err) {
//       res.send(err);
//       return;
//     }
//     res.send(true)
//   })
// });


app.listen(8888);
