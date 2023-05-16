import Tarea from "./tarea.js";

class Tareas {
  _listado = {};

  // Getter
  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).map((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }
  cargarTareasFromArray(tareas = []) {
    tareas.map((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
  listadoCompleto() {
    const listado = this.listadoArr;
    console.log();
    listado.map((tarea, index) => {
      const indice = `${index + 1}.`.magenta;
      const { desc, completadoEn } = tarea;
      const estado =
        completadoEn == null ? "Pendiente".red : "Completada".green;
      console.log(`${indice} ${desc} :: ${estado}`);
    });
  }
  listadoPendientesCompletadas(completadas = true) {
    const listado = this.listadoArr;
    let contador = 0;
    console.log();

    listado.map((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado =
        completadoEn == null ? "Pendiente".red : "Completada".green;

      if (completadas) {
        if (completadoEn != null) {
          contador += 1;
          console.log(`${(contador + ".").magenta}. ${desc} :: ${estado}`);
        }
      } else {
        if (completadoEn == null) {
          contador += 1;
          console.log(`${(contador + ".").magenta}. ${desc} :: ${estado}`);
        }
      }
    });
  }
  toggleCompletadas(ids = []) {
    ids.map((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArr.map((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
  eliminarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }
}

export default Tareas;
