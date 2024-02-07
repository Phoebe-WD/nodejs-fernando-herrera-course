import { request, response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    //   Leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    //  verificar si existe el usuario
    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existente",
      });
    }
    //   verificar si el usuario no está borrado / estado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado false",
      });
    }

    req.user = usuario;

    // req.uid = uid;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export default validarJWT;
