import { response } from "express";

const validarFile = (req, resp = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return resp
      .status(400)
      .json({ msg: "No hay archivos que subir - archivo" });
  }
  next();
};

export { validarFile };
