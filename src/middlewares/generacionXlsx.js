const xlsx = require("xlsx-populate");

const generacionMasiva = async () => {
  const workbook = await xlsx.fromBlankAsync();

  workbook.sheet(0).cell("A1").value("ID");
  workbook.sheet(0).cell("B1").value("Comercio");
  workbook.sheet(0).cell("C1").value("Nombre");
  workbook.sheet(0).cell("D1").value("Email");
  workbook.sheet(0).cell("F1").value("Tel");
  workbook.sheet(0).cell("G1").value("Monto");
  workbook.sheet(0).cell("H1").value("Productos");
};
