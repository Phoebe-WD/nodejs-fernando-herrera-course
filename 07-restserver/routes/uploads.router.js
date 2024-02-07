import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos.js";
import { validarFile } from "../middlewares/validar-file.js";
import {
  showImg,
  updateCloudImg,
  uploadFile,
} from "../controllers/uploads.controller.js";
import { collectionsValid } from "../helpers/db-validators.js";
const router = Router();

router.post("/", validarFile, uploadFile);

router.put(
  "/:collection/:id",
  [
    validarFile,
    check("id", "El id debe ser de mongo").isMongoId(),
    check("collection").custom((c) =>
      collectionsValid(c, ["users", "products"])
    ),
    validarCampos,
  ],
  // updateImg
  updateCloudImg
);

router.get(
  "/:collection/:id",
  [
    check("id", "El id debe ser de mongo").isMongoId(),
    check("collection").custom((c) =>
      collectionsValid(c, ["users", "products"])
    ),
    validarCampos,
  ],
  showImg
);

export default router;
