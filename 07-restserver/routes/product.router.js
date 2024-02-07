import { Router } from "express";
import { check } from "express-validator";
import validarJWT from "../middlewares/validar-jwt.js";
import validarCampos from "../middlewares/validar-campos.js";
import {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} from "../controllers/product.controller.js";
import {
  existeCategoriaId,
  existeProductoId,
} from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";
const router = Router();

// Obtener todas las productos - publico
router.get("/", obtenerProductos);
// Obtener un producto por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoId),
  ],
  obtenerProducto
);
// Crear producto - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("category", "No es un id de mongo").isMongoId(),
    check("category").custom(existeCategoriaId),
    validarCampos,
  ],
  crearProducto
);
// Actualizar producto - privado - cualquier persona con un token válido
router.put(
  "/:id",
  [validarJWT, check("id").custom(existeProductoId), validarCampos],
  actualizarProducto
);
// Borrar producto - privado - solo admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeProductoId),
    validarCampos,
  ],
  borrarProducto
);

export default router;
