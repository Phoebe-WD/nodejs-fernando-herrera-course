const getUserById = (id, cb) => {
  const user = {
    id,
    nombre: "Phoebe",
  };
  setTimeout(() => {
    cb(user);
  }, 1500);
};

getUserById(10, (usuario) => {
  console.log(usuario);
});
