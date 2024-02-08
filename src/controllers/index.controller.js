const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const { createAcessToken } = require("../libs/jwt.js");
const { client, dbName } = require("../database.js");
const session = require("express-session");
const {
  agregarSesionConMovimientosYHorarios,
} = require("../middlewares/sessionsMap.js");

//*Registro usuarios
const registroGet = (req, res) => {
  res.render("registro.ejs");
};

const registroUsuarios = async (req, res) => {
  const { first_name, last_name, tel_area, tel_number, email, password } =
    req.body;
  const db = client.db(dbName);
  const collection = db.collection("users");
  try {
    //? Primero, verifica si el usuario ya existe en la base de datos
    const existingUser = await collection.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json(["El usuario ya existe"]);
    }

    //* Genera un uuid para el usuario
    const userId = uuid.v4();

    //! Si el usuario no existe, procede a agregarlo
    const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña

    const user = {
      _id: userId,
      first_name: first_name,
      last_name: last_name,
      tel_area: tel_area,
      tel_number: tel_number,
      email: email,
      password: hashedPassword,
    };

    //* Usa el método insertOne para agregar el usuario a la colección
    await collection.insertOne(user);

    //? Si se agrega correctamente, puedes responder con un mensaje de éxito
    res.status(201).json(["Usuario registrado con éxito"]);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//*Login de usuarios

const loginGet = (req, res) => {
  res.render("login.ejs", { layout: false });
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json(["Favor ingresa el email"]);
  if (!password)
    return res.status(400).json(["Favor de ingresar la contraseña"]);
  const db = client.db(dbName);
  const collection = db.collection("users");

  try {
    console.log(req.body);
    const userFound = await collection.findOne({ email: email });
    if (!userFound) return res.status(400).json(["User not found"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Incorrect password"]);

    console.log(`Este es el id del usuario ${userFound._id}`);

    req.session.userId = userFound._id;
    //console.log('Este es el id de session: ', req.session.userId)

    const token = await createAcessToken({ id: userFound._id });
    //console.log(token);

    const filtro = { _id: userFound._id };
    //console.log('Este es el filto: ', filtro)

    const tokenMongo = { $set: { jwt: token } };

    //iniciarSesionExitosa(userFound._id, token);
    //res.header("authorization", token);

    const result = await collection.updateOne(filtro, tokenMongo);
    const daatosSession = { email: userFound.email, token: token };

    agregarSesionConMovimientosYHorarios(userFound._id, daatosSession);

    /* res.json({
      id: userFound._id,
      email: userFound.email,
      token,
    }); */
    res.redirect("/api/menu");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registroUsuarios,
  loginUsuario,
  loginGet,
  registroGet,
};
