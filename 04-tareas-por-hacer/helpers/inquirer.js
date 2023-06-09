import inquirer from "inquirer";
import colors from "colors";

const menuQuestions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué deseas hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".magenta} Crear Tarea`,
      },
      {
        value: "2",
        name: `${"2.".magenta} Listar Tareas`,
      },
      {
        value: "3",
        name: `${"3.".magenta} Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4.".magenta} Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${"5.".magenta} Completar Tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".magenta} Borrar Tarea`,
      },
      {
        value: "0",
        name: `${"0.".magenta} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".magenta);
  console.log("  Seleccione una opción".cyan);
  console.log("==========================\n".magenta);
  const { opcion } = await inquirer.prompt(menuQuestions);
  return opcion;
};

const pausa = async () => {
  const pausaOpts = [
    {
      type: "input",
      name: "pausa",
      message: `Presione ${"ENTER".cyan} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(pausaOpts);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}`.magenta;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0".magenta + " Cancelar",
  });
  const questions = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
  //   {
  //   value: tarea.id,
  //   name: `${"1.".magenta} Crear Tarea`,
  // },
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};
const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}`.magenta;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });
  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};
export {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
