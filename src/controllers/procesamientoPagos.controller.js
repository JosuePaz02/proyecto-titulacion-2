const { client, dbName } = require("../database.js");

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

module.exports = { pagoLink };
