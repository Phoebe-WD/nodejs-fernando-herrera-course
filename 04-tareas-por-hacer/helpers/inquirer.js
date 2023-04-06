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
        name: "1. Crear Tarea",
      },
      {
        value: "2",
        name: "2. Listar Tareas",
      },
      {
        value: "3",
        name: "3. Listar Tareas Completadas",
      },
      {
        value: "4",
        name: "4. Listar Tareas Pendientes",
      },
      {
        value: "5",
        name: "5. Completar Tarea(s)",
      },
      {
        value: "6",
        name: "6. Borrar Tarea",
      },
      {
        value: "0",
        name: "0. Salir",
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

export { inquirerMenu, pausa };
