const bcrypt = require("bcryptjs");
var User = require("../models/user");

//register user
exports.userRegister = async (req, res) => {
  const { email, password } = req.body;
  bcrypt.genSalt(10, async function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      try {
        const newUser = new User({ email, password: hash });
        const token = newUser.generateAuthToken();
        errorMsg = newUser.validateSync();
        const saveUser = await newUser.save();
        res.cookie("token", token);
        res.json({ status: 200, data: saveUser });
      } catch (error) {
        res.json({ status: 400, errorMsg: ["error when saving user"] });
      }
    });
  });
};

//login user
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user) {
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (isMatch) {
          const token = user.generateAuthToken();
          res.cookie("token", token);
          res.json({ status: 200, data: user });
        } else {
          res.json({
            status: 400,
            errorMsg: ["email and password is not match"],
          });
        }
      });
    } else {
      res.json({ status: 400, errorMsg: ["email not found"] });
    }
  } catch (error) {
    res.json({ status: 400, errorMsg: ["error when login user"] });
  }
};

//logout user
exports.userLogout = async (req, res) => {
  res.clearCookie("token");
  res.json({ status: 200 });
};
