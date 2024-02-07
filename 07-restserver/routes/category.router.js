import { Router } from "express";
import { check } from "express-validator";
import validarJWT from "../middlewares/validar-jwt.js";
import validarCampos from "../middlewares/validar-campos.js";
import { existeCategoriaId } from "../helpers/db-validators.js";
import {
  crearCategory,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} from "../controllers/category.controller.js";
import { esAdminRole } from "../middlewares/validar-roles.js";
const router = Router();

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);
// Obtener una categorias por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaId),
  ],
  obtenerCategoria
);
// Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategory
);
// Actualizar categoria - privado - cualquier persona con un token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaId),
    validarCampos,
  ],
  actualizarCategoria
);
// Borrar categoria - privado - solo admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeCategoriaId),
    validarCampos,
  ],
  borrarCategoria
);

export default router;
