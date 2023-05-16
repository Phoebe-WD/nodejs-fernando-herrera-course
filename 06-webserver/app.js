import express from "express";
import hbs from "hbs";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Handlebars
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
// Servir contenido estatico
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { nombre: "Fernando Herrera", titulo: "Curso NodeJs" });
  // res.sendFile(__dirname + "/public/index.html");
  //   res.send("404 | Page not found!");
});
app.get("/elements", (req, res) => {
  res.render("elements", {
    nombre: "Fernando Herrera",
    titulo: "Curso NodeJs",
  });
  // res.sendFile(__dirname + "/public/elements.html");
  //   res.send("404 | Page not found!");
});
app.get("/generic", (req, res) => {
  res.render("generic", { nombre: "Fernando Herrera", titulo: "Curso NodeJs" });
  // res.sendFile(__dirname + "/public/generic.html");
  //   res.send("404 | Page not found!");
});

app.listen(port, () => {
  console.log("Escuchando en mi puerto", port);
});
