const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const { createAcessToken } = require("../libs/jwt.js");
const { client, dbName } = require("../database.js");

//*Registro usuarios
const registroUsuarios = async (req, res) => {
  const { first_name, last_name, tel_area, tel_number, email, password } =
    req.body;
  const db = client.db(dbName);
  const collection = db.collection("users");
  try {
    // Primero, verifica si el usuario ya existe en la base de datos
    const existingUser = await collection.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json(["El usuario ya existe"] );
    }

    // Genera un uuid para el usuario
    const userId = uuid.v4();

    // Si el usuario no existe, procede a agregarlo
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

    // Usa el método insertOne para agregar el usuario a la colección
    await collection.insertOne(user);

    // Si se agrega correctamente, puedes responder con un mensaje de éxito
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//*Login de usuarios

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  const db = client.db(dbName);
  const collection = db.collection("users");
  try {
    const userFound = await collection.findOne({ email: email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAcessToken({ id: userFound._id });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      email: userFound.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



const profile = (req,res) => {
  res.json({message: 'Hola jajaja'})
}

module.exports = { registroUsuarios, loginUsuario, profile};
