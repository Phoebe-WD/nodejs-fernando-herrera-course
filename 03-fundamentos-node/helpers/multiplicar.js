const fs = require("fs");
const colors = require("colors");
const crearArchivo = async (base = 5, listar = false, hasta = 10) => {
  try {
    let salida = "";
    let consola = "";
    for (let index = 1; index <= hasta; index++) {
      salida += `${base} x ${index} = ${base * index}\n`;
      consola += `${base} ${"x".cyan} ${index} ${"=".cyan} ${base * index}\n`;
    }
    if (listar) {
      console.log("============".magenta);
      console.log("Tabla del: ".rainbow, colors.cyan(base));
      console.log("============".magenta);
      console.log(consola);
    }

    fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
    return `./salida/tabla-${base}.txt`;
  } catch (err) {
    throw err;
  }
};

module.exports = crearArchivo;
