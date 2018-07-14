const mongoose = require("mongoose");

/* User Schema */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  admin: {
    type: Number
  },
  googleID: {
    type: String
  },
  facebookID: {
    type: String
  }
});

module.exports = mongoose.model("User", UserSchema);
