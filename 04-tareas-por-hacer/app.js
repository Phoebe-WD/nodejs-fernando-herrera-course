import colors from "colors";
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} from "./helpers/inquirer.js";
import Tarea from "./models/tarea.js";
import Tareas from "./models/tareas.js";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    //Establecer tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        // crear tarea
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        console.log(desc);
        break;
      case "2":
        // Listar tarea
        tareas.listadoCompleto();
        break;
      case "3":
        // Listar tarea completada
        tareas.listadoPendientesCompletadas(true);
        break;
      case "4":
        // Listar tarea pendiente
        tareas.listadoPendientesCompletadas(false);
        break;
      case "5":
        // Completado o pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        // console.log(ids);
        break;
      case "6":
        // Borrar Tarea
        const id = await listadoTareasBorrar(tareas.listadoArr);
        const ok = await confirmar("¿Estas seguro?");
        if (id !== "0") {
          if (ok) {
            tareas.eliminarTarea(id);
            console.log("Tarea Borrada");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
