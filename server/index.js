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
    Document.find({
      collabs: {$in: data.userId}
    }, (err, docs) => next({err, docs}))
  })

  socket.on('collaborateDocument', (data, next) => {
    console.log(data.docId);
    Document.findOne({
      _id: data.docId,
    }, (err, docs) => {
      if(err) return next({err, docs})
      docs.collabs.push(data.userId)
      docs.save((err) => {
        next({err, docs})
      })
    })
  })

  socket.on('createDocument', (data, next) => {
    console.log('this is data:'+data);
    new Document({
      creator: data.userId,
      collabs: [data.userId],
      password: data.password,
      title: data.title,
      rawState: ''
    })
    .save((err, doc) => {
      console.log('this is doc'+doc);
      next({err, doc})})
    })

    socket.on('saveDocument', (data, next) => {
      console.log(data.docId)
      console.log(data.rawState)
      Document.findOne({
        _id: data.docId,
      }, (err, doc) => {
        console.log('document found')
        if(err) return next({err})
        doc.rawState = data.rawState
        doc.save((err) => next({err}))
      })
    })
  })

  //All other server route endpoints
  app.use('/', routes(passport));

  server.listen(process.env.PORT || 8888)
