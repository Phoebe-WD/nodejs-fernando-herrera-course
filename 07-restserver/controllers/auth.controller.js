import { response } from "express";
import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/generar-jwt.js";
import googleVerify from "../helpers/google-veriffy.js";

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
  try {
    // Verificar correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }
    // Verificar usuario activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }
    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSigIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });
    // Usuario existe ?
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":3",
        img,
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    // Usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    //  Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "todo ok",
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "el token no se pudo verificar",
    });
    console.log(error);
  }
};

export { login, googleSigIn };
