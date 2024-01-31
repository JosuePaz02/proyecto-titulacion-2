const sessionsMap = new Map();

//* Ejemplo de cómo agregar una sesión con movimientos y horarios al mapa después de un inicio de sesión exitoso
const agregarSesionConMovimientosYHorarios = (idSesion, datosSesion) => {
  //! Inicializar un array para almacenar los movimientos
  datosSesion.movimientos = [];
  //! Agregar la hora de inicio
  datosSesion.horaInicio = new Date();
  sessionsMap.set(idSesion, datosSesion);
  //console.log('Este es el estado del mapa:', sessionsMap);
}

//* Ejemplo de cómo obtener información de una sesión con movimientos y horarios
const obtenerDatosDeSesionConMovimientosYHorarios = (idSesion) => {
  return sessionsMap.get(idSesion);
}

//* Ejemplo de cómo agregar un movimiento a una sesión
const agregarMovimientoASesion = (idSesion, movimiento) => {
  const datosSesion = sessionsMap.get(idSesion);
  if (datosSesion) {
    datosSesion.movimientos.push(movimiento);
    sessionsMap.set(idSesion, datosSesion);
  }
}

//* Ejemplo de cómo actualizar información de sesión con movimientos y horarios
const actualizarDatosDeSesionConMovimientosYHorarios = (idSesion, nuevosDatos) => {
  const datosSesion = sessionsMap.get(idSesion);
  if (datosSesion) {
    //! Actualizar solo si la sesión existe
    Object.assign(datosSesion, nuevosDatos);
    sessionsMap.set(idSesion, datosSesion);
  }
}

//* Ejemplo de cómo cerrar una sesión con movimientos y horarios (por ejemplo, al cerrar sesión)
const cerrarSesionConMovimientosYHorarios = (idSesion) => {
  const datosSesion = sessionsMap.get(idSesion);
  if (datosSesion) {
    //! Agregar la hora de cierre
    datosSesion.horaCierre = new Date();
    sessionsMap.set(idSesion, datosSesion);
  }
}

module.exports = {agregarSesionConMovimientosYHorarios, obtenerDatosDeSesionConMovimientosYHorarios, agregarMovimientoASesion, actualizarDatosDeSesionConMovimientosYHorarios, cerrarSesionConMovimientosYHorarios, sessionsMap}