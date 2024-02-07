import Role from "../models/role.js";
import Usuario from "../models/usuario.js";
import Category from "../models/category.js";
import Product from "../models/product.js";
import { response, request } from "express";

const rolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la DB`);
  }
};

const existeMail = async (correo = "") => {
  const existe = await Usuario.findOne({ correo });
  if (existe) {
    throw new Error(`El correo ${correo} ya está registrado en la DB`);
  }
};
const existeUserId = async (id) => {
  const existe = await Usuario.findById(id);
  if (!existe) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existeCategoriaId = async (id) => {
  const existe = await Category.findById(id);
  if (!existe) {
    throw new Error(`El id ${id} no existe`);
  }
};
const existeProductoId = async (id) => {
  const existe = await Product.findById(id);
  if (!existe) {
    throw new Error(`El id ${id} no existe`);
  }
};

const collectionsValid = (collection = "", collectionValid = []) => {
  const isThere = collectionValid.includes(collection);
  if (!isThere) {
    throw new Error(
      `La colleccion ${collection} no es permitida, ${collectionValid}`
    );
  }
  return true;
};

export {
  rolValido,
  existeMail,
  existeUserId,
  existeCategoriaId,
  existeProductoId,
  collectionsValid,
};
