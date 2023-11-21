// Crear un Map para almacenar información de sesiones con movimientos y horarios
const sessionsMap = new Map();

// Ejemplo de cómo agregar una sesión con movimientos y horarios al mapa después de un inicio de sesión exitoso
function agregarSesionConMovimientosYHorarios(idSesion, datosSesion) {
  // Inicializar un array para almacenar los movimientos
  datosSesion.movimientos = [];
  // Agregar la hora de inicio
  datosSesion.horaInicio = new Date();
  sessionsMap.set(idSesion, datosSesion);
}

// Ejemplo de cómo obtener información de una sesión con movimientos y horarios
function obtenerDatosDeSesionConMovimientosYHorarios(idSesion) {
  return sessionsMap.get(idSesion);
}

// Ejemplo de cómo agregar un movimiento a una sesión
function agregarMovimientoASesion(idSesion, movimiento) {
  const datosSesion = sessionsMap.get(idSesion);
  if (datosSesion) {
    datosSesion.movimientos.push(movimiento);
    sessionsMap.set(idSesion, datosSesion);
  }
}

// Ejemplo de cómo actualizar información de sesión con movimientos y horarios
function actualizarDatosDeSesionConMovimientosYHorarios(idSesion, nuevosDatos) {
  const datosSesion = sessionsMap.get(idSesion);
  if (datosSesion) {
    // Actualizar solo si la sesión existe
    Object.assign(datosSesion, nuevosDatos);
    sessionsMap.set(idSesion, datosSesion);
  }
}

// Ejemplo de cómo cerrar una sesión con movimientos y horarios (por ejemplo, al cerrar sesión)
function cerrarSesionConMovimientosYHorarios(idSesion) {
  const datosSesion = sessionsMap.get(idSesion);
  if (datosSesion) {
    // Agregar la hora de cierre
    datosSesion.horaCierre = new Date();
    sessionsMap.set(idSesion, datosSesion);
  }
}
