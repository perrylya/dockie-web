import mongoose from 'mongoose';

var DocumentSchema = new mongoose.Schema({
  creator: {
    ref: 'User',
    type: mongoose.Schema.ObjectId,
    required: true
  },
  collabs: [{
    ref: 'User',
    type: mongoose.Schema.ObjectId
  }],
  content: {
    type: {},
  },
  password: {
    type: String,
    required: true,
  },
  title: {
      type: String,
      required: false,
  }
});

var Document = mongoose.model('Document', DocumentSchema);
module.exports = Document;
