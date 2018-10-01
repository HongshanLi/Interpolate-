const jwt = require("jsonwebtoken");
const config = require("../lib/config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // jwt.verify throws an error if the token is invalid
    const decodedToken = jwt.verify(token, config.JWT_KEY);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    }
    next();
  } catch (error){
    res.status(401).json({
      message: "Auth failed"
    })
  }
};
