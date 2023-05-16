import http from "http";
// ! CREAR SERVER CON HTTP NATIVO DE NODE
const server = http.createServer((req, res) => {
  res.setHeader("Content-Disposition", "attatchment; filename=lista.csv");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write("Hola Mundo!");
  res.end();
});
server.listen(5000);
// ! FIN
