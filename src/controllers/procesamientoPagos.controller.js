const { client, dbName } = require("../database.js");
const axios = require("axios");
const https = require("https");
const { confirmacionEmail } = require("../middlewares/generacionEmail.js");

const pagoLink = async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("Links");
  const folioLink = req.params.folio;
  console.log(folioLink);

  try {
    const user = await collection.findOne({ folio: folioLink });

    if (!user) {
      throw new Error(
        "No se encontró el enlace asociado al folio proporcionado"
      );
    }

    res.render("procesamientoPago", { layout: false, linkGenerado: user, folio: folioLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const pagoLinkPost = async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("Links");
  const { BNRG_NUMERO_TARJETA, BNRG_FECHA_EXP, BNRG_CODIGO_SEGURIDAD } =
    req.body;
  const folioLink = req.params.folio;
  try {
    if (BNRG_NUMERO_TARJETA.length < 15)
      return res.status(500).send("Minimo deben ser 16 digitos");

    const user = await collection.findOne({ folio: folioLink });
    console.log(folioLink);
    console.log(user);
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
      .replace(/\//g, ""); // Elimina los '/'

    //const ruta = `https://colecto.banregio.com/adq`

    const ruta = `https://testhub.banregio.com/adq?BNRG_CMD_TRANS=${user.tipo_trans}&BNRG_ID_AFILIACION=${user.id_afiliacion}&BNRG_ID_MEDIO=${user.id_medio}&BNRG_FOLIO=${user.folio}&BNRG_HORA_LOCAL=${horaFormateada}&BNRG_FECHA_LOCAL=${fechaFormateada}&BNRG_MODO_ENTRADA=${user.modo_entrada}&BNRG_MODO_TRANS=${user.modo_trans}&BNRG_MONTO_TRANS=${user.link.monto}&BNRG_NUMERO_TARJETA=${BNRG_NUMERO_TARJETA}&BNRG_FECHA_EXP=${BNRG_FECHA_EXP}&BNRG_CODIGO_SEGURIDAD=${BNRG_CODIGO_SEGURIDAD}`;

    console.log(user.tipo_trans);

    const result = await axios.post(ruta, null, {
      //! Configuración adicional de Axios
      httpsAgent: new https.Agent({
        rejectUnauthorized: false, //? Ignorar la verificación del certificado SSL
      }),
    });

    console.log(`Respuesta del server: ${result.headers}`);
    //console.log(result.headers.bnrg_codigo_proc)

    if (result.headers.bnrg_codigo_proc == "R") {
      return res.status(500).send("Fallo en la transacción");
    }

    confirmacionEmail(result);

    res.render("pago", { layout: false });
  } catch (error) {
    console.error(`Error al realizar la peticion: ${error}`);
    res.status(500).send("Error al pagar");
  }
};

module.exports = { pagoLink, pagoLinkPost };
