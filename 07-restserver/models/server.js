import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import router from "../routes/user.router.js";
import category from "../routes/category.router.js";
import product from "../routes/product.router.js";
import auth from "../routes/auth.router.js";
import search from "../routes/search.router.js";
import uploads from "../routes/uploads.router.js";
import dbConnection from "../database/config.js";
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auths: "/api/auth",
      category: "/api/category",
      products: "/api/product",
      users: "/api/user",
      search: "/api/search",
      uploads: "/api/uploads",
    };

    // CONNECT TO DB
    this.conectarDB();
    //Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }
  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    //   CORS
    this.app.use(cors());
    //   Lectura y parseo del body
    this.app.use(express.json());
    //   Directorio publico
    this.app.use(express.static("public"));
    // Fileupload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }
  routes() {
    this.app.use(this.paths.auths, auth);
    this.app.use(this.paths.category, category);
    this.app.use(this.paths.products, product);
    this.app.use(this.paths.users, router);
    this.app.use(this.paths.search, search);
    this.app.use(this.paths.uploads, uploads);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando en mi puerto", this.port);
    });
  }
}

export default Server;
