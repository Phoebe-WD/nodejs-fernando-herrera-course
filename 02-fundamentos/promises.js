const empleados = [
  {
    id: 1,
    nombre: "Fernando",
  },
  {
    id: 2,
    nombre: "Phoebe",
  },
  {
    id: 3,
    nombre: "Matias",
  },
];
const salarios = [
  {
    id: 2,
    salario: 1000,
  },
  {
    id: 3,
    salario: 1500,
  },
  {
    id: 1,
    salario: 1300,
  },
];

const getEmpleado = (id) => {
  return new Promise((res, rej) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;
    empleado ? res(empleado) : rej(`No existe empleado con id: ${id}`);
  });
};
const getSalario = (id) => {
  return new Promise((res, rej) => {
    const salario = salarios.find((s) => s.id === id)?.salario;
    salario
      ? res(salario)
      : rej(`No existe salario para el empleado con id: ${id}`);
  });
};

const id = 4;
// getEmpleado(id)
//   .then((empleado) => console.log(empleado))
//   .catch((err) => console.log(err));
// getSalario(id)
//   .then((salario) => console.log(salario))
//   .catch((err) => console.log(err));
getEmpleado(id)
  .then((empleado) => {
    getSalario(id)
      .then((salario) => {
        console.log("El empleado", empleado, "tiene un salario de:", salario);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
