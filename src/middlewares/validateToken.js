const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");
const {obtenerDatosDeSesionConMovimientosYHorarios} = require('./sessionsMap.js')

const validateToken = async (req, res, next) => {
  try {
    // Asegurémonos de que haya un email en req.body

    const idMap = req.session.userId

    const resulTMap = obtenerDatosDeSesionConMovimientosYHorarios(idMap)
    console.log(resulTMap)

    if (!idMap) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!resulTMap || !resulTMap.token) {
      return res.status(401).json({ message: "No token found, authorization denied" });
    }

    const token = resulTMap.token;

    const user = await jwt.verify(token, TOKEN_SECRET);

    req.user = user;
    console.log('Paso la verificacion de token')
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
