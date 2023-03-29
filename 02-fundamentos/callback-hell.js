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

const getEmpleado = (id, callback) => {
  const empleado = empleados.find((e) => e.id === id);
  if (empleado) {
    callback(null, empleado);
  } else {
    callback(`empleado con ${id} Doesn't exist`);
  }
};
const getSalario = (id, callback) => {
  const salario = salarios.find((e) => e.id === id)?.salario;
  if (salario) {
    callback(null, salario);
  } else {
    callback(`no existe salario para el empleado con ${id}`);
  }
};

getEmpleado(2, (err, empleado) => {
  if (err) {
    console.log("Error");
    return console.log(err);
  }
  console.log("Empleado existe");
  console.log(empleado);
});
getSalario(2, (err, salario) => {
  if (err) {
    console.log("Error");
    return console.log(err);
  }
  console.log("salario existe");
  console.log(salario);
});
