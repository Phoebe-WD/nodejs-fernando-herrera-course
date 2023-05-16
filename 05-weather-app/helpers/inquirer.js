import inquirer from "inquirer";
import colors from "colors";

const menuQuestions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué deseas hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".magenta} Buscar Ciudad`,
      },
      {
        value: 2,
        name: `${"2.".magenta} Historial`,
      },
      {
        value: 0,
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

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, index) => {
    const idx = `${index + 1}`.magenta;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
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
      message: "Seleccione el lugar:",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
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
  listarLugares,
  confirmar,
  mostrarListadoChecklist,
};
