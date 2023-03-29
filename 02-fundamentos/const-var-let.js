// var nombre = "Wolverine"; //! Variable con Scope/ámbito Global
// let nombre = "Iron Man";
const nombre = "Wolverine";

if (true) {
  const nombre = "Magneto";
  console.log(nombre);
}

console.log(nombre);
