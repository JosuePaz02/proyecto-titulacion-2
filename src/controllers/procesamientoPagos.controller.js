const { client, dbName } = require("../database.js");
const axios = require('axios')

const pagoLink = async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("users");
  const idUser = req.session.userId;

  try {
    const user = await collection.findOne({ _id: idUser });

    const userLink = user.pay;

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
  const [BNRG_NUMERO_TARJETA, BNRG_FECHA_EXP, BNRG_CODIGO_SEGURIDAD] = req.body;
  try {

    const ruta = `https://testhub.banregio.com/adq?BNRG_CMD_TRANS=VENTA&BNRG_ID_AFILIACION=8090005&BNRG_ID_MEDIO=YYTN6gGG&BNRG_FOLIO=213432&BNRG_HORA_LOCAL=012420&BNRG_FECHA_LOCAL=01112023&BNRG_MODO_ENTRADA=MANUAL&BNRG_MODO_TRANS=AUT&BNRG_MONTO_TRANS=2000&BNRG_NUMERO_TARJETA=${BNRG_NUMERO_TARJETA}&BNRG_FECHA_EXP=${BNRG_FECHA_EXP}&BNRG_CODIGO_SEGURIDAD=${BNRG_CODIGO_SEGURIDAD}` 


    const result = await axios.post(ruta)
    console.log(`Respuesta del server: ${result.data}`)

    res.status(200).send(`Pago hecho correctamente.`)
  } catch (error) {
    console.error(`Error al realizar la peticion: ${error}`)
    res.status(500).send('Error al pagar')
    
  }
};

module.exports = { pagoLink, pagoLinkPost };
