import { response } from "express";
import { isValidObjectId } from "mongoose";
import Usuario from "../models/usuario.js";
import Category from "../models/category.js";
import Product from "../models/product.js";

const collectionAccepted = ["product", "category", "roles", "user"];
const searchUser = async (term = "", resp = response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const user = await Usuario.findById(term);
    return resp.json({
      results: user ? [user] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const users = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  resp.json({
    results: users,
  });
};
const searchCat = async (term = "", resp = response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const category = await Category.findById(term);
    return resp.json({
      results: category ? [category] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const categories = await Category.find({
    nombre: regex,
    estado: true,
  });
  resp.json({
    results: categories,
  });
};
const searchProd = async (term = "", resp = response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const product = await Product.findById(term).populate("category", "nombre");
    return resp.json({
      results: product ? [product] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const products = await Product.find({
    nombre: regex,
    estado: true,
  }).populate("category", "nombre");
  resp.json({
    results: products,
  });
};

const searchAny = async (req, resp = response) => {
  const { collection, term } = req.params;

  if (!collectionAccepted.includes(collection)) {
    return resp.status(400).json({
      msg: `Las colecciones permitidas son: ${collectionAccepted}`,
    });
  }
  switch (collection) {
    case "product":
      searchProd(term, resp);
      break;
    case "category":
      searchCat(term, resp);
      break;
    case "roles":
      break;
    case "user":
      searchUser(term, resp);
      break;
    default:
      resp.status(500).json({
        msg: "Se le olvido hacer esta búsqueda",
      });
  }
};

export { searchAny };
