import { Router } from "express";
import { check } from "express-validator";
import { login, googleSigIn } from "../controllers/auth.controller.js";
import validarCampos from "../middlewares/validar-campos.js";

const router = Router();
router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [check("id_token", "id_token es necesario").not().isEmpty(), validarCampos],
  googleSigIn
);

export default router;
