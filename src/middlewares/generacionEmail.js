const { execute } = require("../sendEmail");
const { client, dbName } = require("../database.js");

const emailLink = (message) => {
  try {
    const messageRes = `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ejemplo de Correo HTML</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
        <h1 style="color: #333;">¡Hola!</h1>
        <p style="color: #555;">Buen día ${message.link.nombre} ha sido generado su link de pago con folio ${message.folio}.</p>
          <li><strong>Link de pago:</strong> <b>${message.link.pay}</b></li>
          <em>Monto:</em> <i>${message.link.monto} a ${message.link.mes} meses.</i>
        <p>${message.link.descripcion}</p>
      </div>
    </body>
    </html>
    `;

    const options = {
      from: "jpaz7913@gmail.com",
      to: {
        name: message.link.nombre,
        email: message.link.email,
      },
      subject: "Pagar por favor",
      body: messageRes,
    };

    execute(options);
  } catch (error) {
    console.error(`No se puede enviar Email: ${error}`)
  }
};

const confirmacionEmail = async (result) => {
  const folio = result.headers.bnrg_folio;
  const db = client.db(dbName);
  const collection = db.collection("Links");
  try {
    const confirm = await collection.findOne({ folio: folio });

    const messageRes = `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ejemplo de Correo HTML</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
        <h1 style="color: #333;">¡Hola!</h1>
        <p style="color: #555;">Buen día ${confirm.link.nombre} ha pago exitosamente el link
        con folio: ${confirm.folio}.</p>
        <p>Gracias</p>
      </div>
    </body>
    </html>
    `;

    const options = {
      from: "jpaz7913@gmail.com",
      to: {
        name: confirm.link.nombre,
        email: confirm.link.email,
      },
      subject: "Confirmacion de Pago",
      body: messageRes,
    };

    execute(options);
  } catch (error) {
    console.error(`El correo no se pudo mandar: ${error}`);
  }
};

const emailContraseña = (userFound, linkPassword) => {
  const messageRes = `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ejemplo de Correo HTML</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
        <h1 style="color: #333;">¡Hola!</h1>
        <p style="color: #555;">Buen día ${userFound.first_name} se ha enviado el link para restablecer su contraseña</p>
          <li><strong>Link:</strong> <b>${linkPassword}</b></li>
      </div>
    </body>
    </html>
    `;

    const options = {
      from: "jpaz7913@gmail.com",
      to: {
        name: userFound.first_name,
        email: userFound.email,
      },
      subject: "Recuperacion Contraseña",
      body: messageRes,
    };

    execute(options);
}

module.exports = { emailLink, confirmacionEmail, emailContraseña };