// * secret route - only available for login users
exports.secretRoute = (req, res) => {
  res.json({
    status: 200,
    message: "This is a secret route, you can only view this if you have login",
  });
};
