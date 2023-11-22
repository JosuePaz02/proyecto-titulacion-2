const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");
const session = require('express-session')
const { client, dbName } = require("../database.js");

const validateToken = async (req, res, next) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("users");
    
    // Asegurémonos de que haya un email en req.body
    const email = req.session.email;
    //console.log(email)

    if (!email) {
      return res.status(400).redirect( "/login");
    }

    const userFound = await collection.findOne({ email });
    console.log(userFound)

    if (!userFound || !userFound.jwt) {
      return res.status(401).json({ message: "No token found, authorization denied" });
    }

    const token = userFound.jwt;

    const user = await jwt.verify(token, TOKEN_SECRET);

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).redirect('/login');
    } else {
      return res.status(401).redirect('/login');
    }
  }
};




module.exports = { validateToken };
