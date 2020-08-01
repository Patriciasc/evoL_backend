const jwt = require("jsonwebtoken");
const UserModel = require("../models/users.model");

// Authenticate Middleware
function authUser(req, res, next) {
  console.log("authUser");
  if (!req.headers.token) {
    res.status(403).json({ error: "No Token found" });
  } else {
    try {
      console.log("authUser: " + req.headers.token);
      const decodedToken = jwt.verify(req.headers.token, process.env.SECRET);

      UserModel.findOne({ email: decodedToken.email }).then((user) => {
        res.locals.user = user;
        next();
      });
    } catch (error) {
      res.status(403).json({ error: `Token not valid + ${error}` });
    }
  }
}

// Return HTTP error with details in JSON
function handleError(err, res) {
  return res.status(400).json(err);
}

module.exports = {
  authUser,
  handleError,
};
