// Crear un Map para almacenar sesiones
const sessionsMap = new Map();

// Función para manejar el inicio de sesión exitoso
const iniciarSesionExitosa = (userId, token) => {
  // Crear una entrada en el Map con el token como clave y la información de la sesión como valor
  sessionsMap.set(token, {
    userId: userId,
  });
}

module.exports = {iniciarSesionExitosa}
