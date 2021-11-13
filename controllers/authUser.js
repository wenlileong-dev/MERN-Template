const jwt = require("jsonwebtoken");

exports.authUser = (req, res, next) => {
  // Read the token from the cookie
  const token = req.cookies.token;
  if (!token)
    return res.json({
      status: 401,
      errorMsg: "Access denied...No token provided...",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (er) {
    // console.log("err", er);
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("token");
    return res.json({
      status: 400,
      errorMsg: "Access denied...Invalied token",
    });
  }
};
