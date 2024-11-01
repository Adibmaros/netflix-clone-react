const { ERR } = require("./response");
const User = require("../models/index.model");

const checkAuth = async (req, res, next) => {
  const email = req.body.email || req.params.email;
  const token = req.body.token || req.params.token;

  if (!email || !token) {
    return ERR(res, 401, "Error, no data provided");
  }

  try {
    const user = await User.findOne({ email, token });
    if (!user) {
      return ERR(res, 401, "Invalid token or email");
    }
    req.user = user;
    next();
  } catch (error) {
    return ERR(res, 500, "error!, can't check token or email", error);
  }
};

module.exports = checkAuth;
