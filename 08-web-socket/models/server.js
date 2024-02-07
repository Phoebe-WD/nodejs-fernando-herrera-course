import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socketController from '../sockets/controller.js';

class Servidor {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = new Server(this.server);
    this.paths = {};

    //Middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Sockets
    this.sockets();
  }
  middlewares() {
    //   CORS
    this.app.use(cors());
    //   Directorio publico
    this.app.use(express.static('public'));
  }
  routes() {}
  sockets() {
    this.io.on('connection', socketController);
  }
  listen() {
    this.server.listen(this.port, () => {
      console.log('Escuchando en mi puerto', this.port);
    });
  }
}

export default Servidor;
