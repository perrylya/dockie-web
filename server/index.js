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

io.on('connection', function (socket) {

  socket.on('getDocuments', (data, next) => {
    Document
    .find({collabs: {$in: data.userId}})
    .populate('collabs')
    .exec(function(err, docs) {
      next({err, docs})
    })
  })

  socket.on('collaborateDocument', (data, next) => {
    Document.findOne({
      _id: data.docId,
    }, (err, docs) => {
      if(err) return next({err, docs})
      if (docs.collabs.indexOf(data.userId) === -1) {docs.collabs.push(data.userId)}
      docs.save((err) => {next({err, docs})})
    })
  })

  socket.on('createDocument', (data, next) => {
    new Document({
      creator: data.userId,
      collabs: [data.userId],
      password: data.password,
      title: data.title,
      rawState: ''
    })
    .save((err, doc) => {
      next({err, doc})
    })
  })

  socket.on('saveDocument', (data, next) => {
    Document.findOne({
      _id: data.docId,
    }, (err, doc) => {
      if(err) return next({err})
      doc.rawState = data.rawState
      doc.save((err) => next({err}))
    })
  })

  socket.on('openDocument', (data, next) => {
    socket.join(data.docId)
    Document.findOne({
      _id: data.docId,
    }, (err, doc) => next({err, doc}))
  })

  socket.on('syncDocument', (data, next) => {
    io.to(data.docId).emit('syncDocument', data.rawState)
  })


  socket.on('deleteDocument', (data, next) => {
    Document.deleteOne({
      _id: data.docId
    }, (err, success) => {
      if (err) return next({err})
      else if (!err) return next({success})
    })
  })

})

//All other server route endpoints
app.use('/', routes(passport));

server.listen(process.env.PORT || 8888)
