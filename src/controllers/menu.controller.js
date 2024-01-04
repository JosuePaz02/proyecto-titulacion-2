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
  res.render("links.ejs");
};
const vistanotificaciones = (req, res) => {
  res.render("notificaciones.ejs");
};

module.exports = {
  linksGet,
  vistaprincipal,
  vistalinks,
  vistanotificaciones,
};

//aqui voy a poner los scripts para la ventana modal

//const btnAbrirModal = document.querySelector("#btn-abrir-modal");
//const btnCerrarModal = document.querySelector("#btn-cerrar-modal");
//const modal = document.querySelector("#modal");

//btnAbrirModal.addEventListener("click",()=>{
  //modal.showModal();
//})
//btnCerrarModal.addEventListener("click",()=>{
  //modal.closest();
//})