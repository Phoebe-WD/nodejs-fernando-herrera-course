import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import capitalize from "capitalize";
import {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist,
} from "./helpers/inquirer.js";
import Busquedas from "./models/busquedas.js";

const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad: ");
        // Buscar lugares
        const lugares = await busquedas.ciudad(termino);
        const idSelected = await listarLugares(lugares);
        if (idSelected === "0") continue;

        // Seleccionar el lugar
        const lugarSelected = lugares.find((id) => id.id === idSelected);
        const { nombre, lat, lng } = lugarSelected;
        // Guardar en DB
        busquedas.agregarHistorial(nombre);
        // Clima
        const clima = await busquedas.climaLugar(lat, lng);
        const { temp, min, max, desc, hum, wind } = clima;
        // Mostrar resultados
        console.log("==========================".magenta);
        console.log("Información de la ciudad".cyan);
        console.log("==========================\n".magenta);
        console.log("Ciudad:", `${nombre}`.cyan);
        console.log("Lat:", `${lat}`.cyan);
        console.log("Lng:", `${lng}`.cyan);
        console.log("Temperatura:", `${Math.round(temp)}`.cyan, "ºC".magenta);
        console.log("Mínima:", `${Math.round(min)}`.cyan, "ºC".magenta);
        console.log("Máxima:", `${Math.round(max)}`.cyan, "ºC".magenta);
        console.log("Como está el clima:", `${desc}`.cyan);
        console.log("Humedad:", `${hum}`.cyan, "%".magenta);
        console.log("Viento:", `${Math.round(wind)}`.cyan, "km/h".magenta);
        break;
      case 2:
        busquedas.historial.map((lugar, index) => {
          const idx = `${index + 1}`.magenta;
          console.log(`${idx}.`.magenta, `${capitalize.words(lugar)}`);
        });
        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
