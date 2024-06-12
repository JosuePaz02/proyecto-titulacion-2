const { client, dbName } = require("../database.js");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const { emailContraseña } = require("../middlewares/generacionEmail.js");
const { PORT, HOST_ENV } = require("../config.js");

const recuperarContraseniaGet = (req, res) => {
  res.render("forgot_password.ejs", { layout: false });
};

const recuperarContraseniaPost = async (req, res) => {
  const { email } = req.body;
  const db = client.db(dbName);
  const collection = db.collection("users");
  try {
    const userFound = await collection.findOne({ email: email });

    const linkUuid = uuid.v4();
    const hasUuid = await bcrypt.hash(linkUuid, 10);
    const cleanHash = hasUuid.replace(/\//g, "");

    req.session.resCon = cleanHash;
    req.session.emailCon = userFound;

    const linkPassword = `${HOST_ENV}:${PORT}/restablecer/${cleanHash}`;

    emailContraseña(userFound, linkPassword);
    res.status(201).send("Se ha enviado un correo");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Se ha producido un error: ${error}`);
  }
};

const restablecerContraseniaGet = (req, res) => {
  const uuid = req.session.resCon;
  res.render("restablecer_password.ejs", { layout: false });
};

const restablecerContraseniaPost = async () => {
  const { password } = req.body;
  const db = client.db(dbName);
  const collection = db.collection("users");
  try {
    const uuid = req.session.resCon;
    const user = req.session.emailCon;
    const userEmail = user.email;

    const filtro = { email: userEmail };

    await collection.updateOne(filtro, { $set: { password: password } });
    res.status(200).send("se cambio la contraseña");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cambiar la contraseña");
  }
};

module.exports = {
  recuperarContraseniaGet,
  recuperarContraseniaPost,
  restablecerContraseniaGet,
  restablecerContraseniaPost,
};
