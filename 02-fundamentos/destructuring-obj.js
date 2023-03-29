const deadpool = {
  nombre: "Wade",
  apellido: "Winston",
  poder: "Regeneración",
  edad: 50,
  getNombre() {
    return `${this.nombre} ${this.apellido}`;
  },
};

// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

function imprimeHeroe({ nombre, apellido, edad, poder }) {
  //   const { nombre, apellido, poder, edad } = heroe;
  console.log(nombre, apellido, poder, edad);
}

// imprimeHeroe(deadpool);

const heroes = ["Wolverine", "Deadpool", "Batman"];

// const h1 = heroes[0];
// const [, , h3] = heroes;

function imprimeHero([h1, h2, h3]) {
  console.log(h1, h2, h3);
}

imprimeHero(heroes);
