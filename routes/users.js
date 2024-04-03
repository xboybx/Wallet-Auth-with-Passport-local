const mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/LocalStrategyDD");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  userId: { type: String, unique: true },
  profilePicture: { type: String }
  // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], // Array of post references
});


userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);


