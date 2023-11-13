const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token, authorization denied" });

  const token = authHeader.split(" ")[1]; //? Divide el encabezado en dos partes: "Bearer" y "<token>", y toma la segunda parte

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = { validateToken };
