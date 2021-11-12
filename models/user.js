const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  // attributes of user
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

module.exports = mongoose.model("User", UserSchema);
