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
  res.render("home");
};

/* const vistaprincipal = (req, res) => {
  res.render("home");
}; */

const vistalinks = (req, res) => {
  res.render("links");
};
const vistanotificaciones = (req, res) => {
  res.render("notificaciones");
};

module.exports = {
  linksGet,
  vistalinks,
  vistanotificaciones,
};

//aqui voy a poner los scripts para la ventana modal

//const btnAbrirModal =  document.querySelector("#btn-abrir-modal")
//const btnCerrarModal =  document.querySelector("#btn-cerrar-modal")
//const modal =  document.querySelector("#modal")

//btnAbrirModal.addEventListener("click",()=>{
  //modal.showModal();
//})
//btnCerrarModal.addEventListener("click",()=>{
  //modal.closest();
//})

//function openModal() {
  //document.getElementById('myModal').style.display = 'flex';
//}

// Función para cerrar la ventana modal
//function closeModal() {
  //document.getElementById('myModal').style.display = 'none';
//}

// Cerrar la ventana modal haciendo clic fuera de ella
//window.addEventListener('click', function(event) {
  //var modal = document.getElementById('myModal');
  //if (event.target === modal) {
    //modal.style.display = 'none';
  //}
//});