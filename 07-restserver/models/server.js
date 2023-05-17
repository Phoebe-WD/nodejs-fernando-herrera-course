import express from "express";
import cors from "cors";
import router from "../routes/user.router.js";
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRouter = "/api/user";

    //Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }
  middlewares() {
    //   CORS
    this.app.use(cors());
    //   Lectura y parseo del body
    this.app.use(express.json());
    //   Directorio publico
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.userRouter, router);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando en mi puerto", this.port);
    });
  }
}

export default Server;
