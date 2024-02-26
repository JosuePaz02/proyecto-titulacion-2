const { client, dbName } = require("../database.js");
const axios = require("axios");

const pagoLink = async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("Links");
  const idUser = req.session.userId;

  try {
    const user = await collection.findOne({ "link.idUser": idUser });

    const userLink = user.link.pay;

    const uuid = (userLink) => {
      //? Encontrar la posición del último '/'
      const ultimoSlashIndex = userLink.lastIndexOf("/");
      console.log(ultimoSlashIndex);
      if (ultimoSlashIndex !== -1) {
        //? Extraer el UUID que viene después del último '/'
        const extraerUuid = userLink.substring(ultimoSlashIndex + 1);
        return extraerUuid;
      } else {
        //* Si no se encuentra ningún '/', devolver null o lanzar un error según sea necesario
        throw new Error("No se encontro el uuid solicitado");
      }
    };

    res.render("procesamientoPago.ejs", { layout: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const pagoLinkPost = async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("Links");
  const [BNRG_NUMERO_TARJETA, BNRG_FECHA_EXP, BNRG_CODIGO_SEGURIDAD] = req.body;
  const idUser = req.session.userId;
  try {
    const user = await collection.findOne({ "link.idUser": idUser });
    const fechaActual = new Date();

    // Opciones de formato para la hora
    const opcionesHora = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Formato de 24 horas
    };

    // Opciones de formato para la fecha
    const opcionesFecha = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    // Formatear la hora y la fecha
    const horaFormateada = fechaActual
      .toLocaleTimeString("es-MX", opcionesHora)
      .replace(/:/g, ""); // Elimina los ':'
    const fechaFormateada = fechaActual
      .toLocaleDateString("es-MX", opcionesFecha)
      .replace(/\//g, ""); // Elimina los '/

    const ruta = `https://testhub.banregio.com/adq?BNRG_CMD_TRANS=${user.tipo_trans}&BNRG_ID_AFILIACION=${user.id_afiliacion}&BNRG_ID_MEDIO=${user.id_medio}&BNRG_FOLIO=${user.folio}&BNRG_HORA_LOCAL=${horaFormateada}&BNRG_FECHA_LOCAL=${fechaFormateada}&BNRG_MODO_ENTRADA=${user.modo_entrada}&BNRG_MODO_TRANS=${user.modo_trans}&BNRG_MONTO_TRANS=${user.link.monto}&BNRG_NUMERO_TARJETA=${BNRG_NUMERO_TARJETA}&BNRG_FECHA_EXP=${BNRG_FECHA_EXP}&BNRG_CODIGO_SEGURIDAD=${BNRG_CODIGO_SEGURIDAD}`;

    const result = await axios.post(ruta);
    console.log(`Respuesta del server: ${result.data}`);

    res.status(200).send(`Pago hecho correctamente.`);
  } catch (error) {
    console.error(`Error al realizar la peticion: ${error}`);
    res.status(500).send("Error al pagar");
  }
};

module.exports = { pagoLink, pagoLinkPost };
