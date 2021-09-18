const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.headers["authentication"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  },
  
}
