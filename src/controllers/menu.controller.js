const {
  obtenerDatosDeSesionConMovimientosYHorarios,
} = require("../middlewares/sessionsMap.js");

const linksGet = async (req, res) => {
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
  res.render("menu.ejs");
};

const vistaprincipal = (req, res) => {
  res.render("home");
};

const vistalinks = (req, res) => {
  res.render("links");
};
const vistanotificaciones = (req, res) => {
  res.render("notificaciones");
};

module.exports = {
  linksGet,
  vistaprincipal,
  vistalinks,
  vistanotificaciones,
};
