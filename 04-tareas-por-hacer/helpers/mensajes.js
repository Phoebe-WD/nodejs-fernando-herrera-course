require("colors");

const mostrarMenu = () => {
  return new Promise((res) => {
    console.clear();
    console.log("==========================".magenta);
    console.log("  Seleccione una opción".cyan);
    console.log("==========================\n".magenta);

    console.log(`${"1.".magenta} Crear Tarea`);
    console.log(`${"2.".magenta} Listar Tareas`);
    console.log(`${"3.".magenta} Listar Tareas Completadas`);
    console.log(`${"4.".magenta} Listar Tareas Pendientes`);
    console.log(`${"5.".magenta} Completar Tarea(s)`);
    console.log(`${"6.".magenta} Borrar Tarea`);
    console.log(`${"0.".magenta} Salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Seleccione una opción: ", (opt) => {
      readline.close();
      res(opt);
    });
  });
};
const pausa = () => {
  return new Promise((res) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(`\nPresione: ${"ENTER".cyan} para continuar\n`, (opt) => {
      readline.close();
      res();
    });
  });
};
module.exports = { mostrarMenu, pausa };
