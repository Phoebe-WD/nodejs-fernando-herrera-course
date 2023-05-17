import dotenv from "dotenv";
dotenv.config();
// import path from "path";
// import { fileURLToPath } from "url";
import Server from "./models/server.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const server = new Server();

server.listen();
