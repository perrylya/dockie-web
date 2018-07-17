import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
let app = express();
import mongoose from 'mongoose';

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

app.listen(8888);
