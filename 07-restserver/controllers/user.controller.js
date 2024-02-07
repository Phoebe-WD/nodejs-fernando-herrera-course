import { response, request } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuario.js";

const userGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    usuarios,
  });
};
const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, correo, google, ...rest } = req.body;
  // VALIDAR EN BASE DE DATOS
  if (password) {
    // ENCRIPTAR PASSWORD
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, rest, { new: true });

  res.json(usuario);
};
const userPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  // ENCRIPTAR PASSWORD
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  // GUARDAR DB
  await usuario.save();
  res.json({
    usuario,
  });
};
const userPatch = (req = request, res = response) => {
  res.json({
    msg: "patch api",
  });
};
const userDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  const usuarioAutenticado = req.user;
  res.json({ usuario, usuarioAutenticado });
};

export { userGet, userPut, userPost, userPatch, userDelete };
