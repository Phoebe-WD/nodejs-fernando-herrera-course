import { response } from "express";
import Product from "../models/product.js";

const crearProducto = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;
  const productDB = await Product.findOne({ nombre: body.nombre });

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.nombre}, ya existe`,
    });
  }

  // Generar data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.user._id,
  };
  const product = new Product(data);

  // Guardar DB

  await product.save();

  res.status(201).json(product);
};

const obtenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, productos] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre")
      .populate("category", "nombre"),
  ]);
  res.json({
    total,
    productos,
  });

  // populate
};
const obtenerProducto = async (req, res = response) => {
  // obtener productos
  const { id } = req.params;
  const producto = await Product.findById(id)
    .populate("usuario", "nombre")
    .populate("category", "nombre");
  res.json(producto);
};

const actualizarProducto = async (req, res = response) => {
  // actualizar nombre
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.user._id;
  const producto = await Product.findByIdAndUpdate(id, data, { new: true });
  res.json(producto);
};

const borrarProducto = async (req, res = response) => {
  // borrar producto - modificar estado false
  const { id } = req.params;

  const productoBorrado = await Product.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json(productoBorrado);
};
export {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
