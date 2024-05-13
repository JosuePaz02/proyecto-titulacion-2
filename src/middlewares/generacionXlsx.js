const xlsx = require("xlsx-populate");
const uuid = require("uuid");

const generacionMasiva = async (file, idUser) => {
  const workbook = await xlsx.fromFileAsync(file);
  const value = workbook.sheet(0).usedRange().value();

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

  // Recorremos cada fila de la matriz
  const objetosFilas = value.slice(1).map((fila) => {
    const objetoFila = {
      folio: folio,
      id_afiliacion: "8090005",
      id_medio: "YYTN6gGG",
      modo_entrada: "MANUAL",
      modo_trans: "AUT",
      tipo_trans: "VENTA",
      link: {
        idUser: idUser,
      },
      fecha_creacion: fechaActual,
      hora_creacion: horaActual,
    };
    value[0].forEach((encabezado, indiceColumna) => {
      objetoFila.link[encabezado] = fila[indiceColumna];
    });
    return objetoFila;
  });

  return objetosFilas;
};

module.exports = { generacionMasiva };
