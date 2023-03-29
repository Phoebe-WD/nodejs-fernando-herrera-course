const crearArchivo = require("./helpers/multiplicar");
const argv = require("./config/yargs");
const colors = require("colors");
console.clear();

// console.log(argv);
// console.log("base yargs", argv.base);
// const [, , arg3] = process.argv;
// const [, base] = arg3.split("=");

// console.log(base);

crearArchivo(argv.base, argv.l, argv.h)
  .then((nombreArchivo) =>
    console.log(colors.rainbow(nombreArchivo), colors.rainbow("Creado"))
  )
  .catch((err) => console.log(err));
