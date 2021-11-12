var validator = require("validator");
const User = require("../models/user");

//validate email and password input when register user
// * email and password is required
// * email need to be a valid format and is not registered before
// * password need to be a strong password
// more than 8 characters, including at least one number, lower case letter, and a capital case letter

exports.userValidator = async (req, res, next) => {
  let errorMsg = [];
  const { email, password } = req.body;
  if (email) {
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      errorMsg.push("email is registered");
    }
    if (!validator.isEmail(email)) {
      errorMsg.push("email is not valid");
    }
  } else {
    errorMsg.push("email is required");
  }
  if (password) {
    if (
      !validator.isStrongPassword(password, {
        minSymbols: 0,
      })
    ) {
      errorMsg.push("password is not strong");
    }
  } else {
    errorMsg.push("password is required");
  }

  if (errorMsg.length > 0) {
    res.json({ status: 400, errorMsg: errorMsg });
  } else {
    next();
  }
};
