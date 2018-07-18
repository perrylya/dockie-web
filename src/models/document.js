import mongoose from 'mongoose';

var DocumentSchema = new mongoose.Schema({
  creator: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  collabs: [
    {type: String},
  ],
  content: {
    type: {},
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
      type: String,
      required: false,
  }
});

var Document = mongoose.model('Document', DocumentSchema);
module.exports = Document;
