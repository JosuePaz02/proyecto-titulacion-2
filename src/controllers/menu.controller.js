const {
  obtenerDatosDeSesionConMovimientosYHorarios,
} = require("../middlewares/sessionsMap.js");
const { rabbitMQRpcClient } = require("../middlewares/queue/Productor.js");
const uuid = require("uuid");

const linksGet = async (req, res) => {
  try {
    const idUser = req.session.userId;
    //console.log('Este es el idUser: ',idUser);

    setInterval(async () => {
      const datosSesionUsuario =
        await obtenerDatosDeSesionConMovimientosYHorarios(idUser);
      //console.log(datosSesionUsuario);

      if (datosSesionUsuario) {
        console.log(
          `Datos de sesión actualizados: ${JSON.stringify(datosSesionUsuario)}`
        );
      } else {
        console.log("Usuario no autenticado");
      }
    }, 10000);
    res.render("home");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* const vistaprincipal = (req, res) => {
  res.render("home");
}; */

const vistalinks = (req, res) => {
  res.render("links");
};

const generarLink = (req, res) => {
  try {
    const { nombre, email, telefono, monto, meses, descripcionTextArea } =
      req.body;
    const idUser = req.session.userId;
    const uuid1 = uuid.v4();

    const shortUUID = uuid1.substring(0, 6);

    //? Convertir los caracteres a valores numéricos
    const folio = shortUUID
      .split("-")
      .map((char) => parseInt(char, 16))
      .join("");

    const ahora = new Date();

    //? Se obtiene la fecha en formato AA/MM/DD
    const fechaActual = ahora.toISOString().split("T")[0];

    //? Se obtiene la hora en formato HH/MM/SS
    const horaActual =
      ahora.getHours() + ":" + ahora.getMinutes() + ":" + ahora.getSeconds();

    req.session.folioLink = folio;

    const link1 = {
      folio: folio,
      id_afiliacion: "8090005",
      id_medio: "YYTN6gGG",
      modo_entrada: "MANUAL",
      modo_trans: "AUT",
      tipo_trans: "VENTA",
      link: {
        nombre: nombre,
        email: email,
        telefono: telefono,
        monto: monto,
        mes: meses,
        desc: descripcionTextArea,
        idUser: idUser,
      },
      fecha_creacion: fechaActual,
      hora_creacion: horaActual,
    };

    console.log(link1);

    rabbitMQRpcClient(link1);
    req.flash("success_msg", "Link creado");
    return res.redirect("/api/links");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const vistanotificaciones = (req, res) => {
  res.render("notificaciones");
};

const registrouser = (req, res) => {
  res.render("registro");
};

module.exports = {
  linksGet,
  vistalinks,
  vistanotificaciones,
  generarLink,
  registrouser,
};
