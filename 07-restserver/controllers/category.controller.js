import { response } from "express";
import Category from "../models/category.js";

const crearCategory = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Category.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  // Generar data a guardar
  const data = {
    nombre,
    usuario: req.user._id,
  };
  const categoria = new Category(data);

  // Guardar DB

  await categoria.save();

  res.status(201).json(categoria);
};

const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, categorias] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre"),
  ]);
  res.json({
    total,
    categorias,
  });

  // populate
};
const obtenerCategoria = async (req, res = response) => {
  // obtener categorias
  const { id } = req.params;
  const categoria = await Category.findById(id).populate("usuario", "nombre");
  res.json(categoria);
};

const actualizarCategoria = async (req, res = response) => {
  // actualizar nombre
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.user._id;
  const categoria = await Category.findByIdAndUpdate(id, data, { new: true });
  res.json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  // borrar categoria - modificar estado false
  const { id } = req.params;

  const categoriaBorrada = await Category.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json(categoriaBorrada);
};
export {
  crearCategory,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
