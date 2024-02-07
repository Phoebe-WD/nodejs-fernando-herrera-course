import { Router } from "express";
import { check } from "express-validator";
import {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete,
} from "../controllers/user.controller.js";
import validarCampos from "../middlewares/validar-campos.js";
import validarJWT from "../middlewares/validar-jwt.js";
import { esAdminRole, tieneRol } from "../middlewares/validar-roles.js";
// import {
//   validarCampos,
//   validarJWT,
//   esAdminRole,
//   tieneRol,
// } from "../middlewares/index.js";
import {
  rolValido,
  existeMail,
  existeUserId,
} from "../helpers/db-validators.js";

const router = Router();
router.get("/", userGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUserId),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  userPut
);
router.post(
  "/",
  [
    check("correo").custom(existeMail),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña es obligatoria y más de 6 caracteres"
    ).isLength({ min: 6 }),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  userPost
);
router.patch("/", userPatch);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUserId),
    validarCampos,
  ],
  userDelete
);

export default router;
