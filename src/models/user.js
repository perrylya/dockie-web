import mongoose from 'mongoose';


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
