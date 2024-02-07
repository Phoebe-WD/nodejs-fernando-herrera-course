import * as fs from "fs";
import path from "node:path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { response } from "express";
import { uploadFiles } from "../helpers/upload-files.js";
import Usuario from "../models/usuario.js";
import Product from "../models/product.js";
import { v2 as cloudinary } from "cloudinary";

const callCloudinary = () => {
  cloudinary.config({
    cloud_name: "dkvrdvbds",
    api_key: "559948286717619",
    api_secret: process.env.CLOUD_API_TOKEN,
  });
  return cloudinary;
};

const uploadFile = async (req, resp = response) => {
  try {
    const nombre = await uploadFiles(req.files, undefined, "imgs");
    resp.json({
      nombre,
    });
  } catch (msg) {
    resp.status(400).json({ msg });
  }
};

const updateImg = async (req, resp = response) => {
  const { id, collection } = req.params;
  let modelo;
  switch (collection) {
    case "users":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "products":
      modelo = await Product.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return resp.status(500).json({ msg: "Se me olvido valdar esto" });
  }

  // limpiar img
  if (modelo.img) {
    const pathImg = path.join(__dirname, "../uploads", collection, modelo.img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg);
    }
  }

  const nombre = await uploadFiles(req.files, undefined, collection);
  modelo.img = nombre;
  await modelo.save();
  resp.json(modelo);
};

const showImg = async (req, resp = response) => {
  const { id, collection } = req.params;
  let modelo;
  switch (collection) {
    case "users":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "products":
      modelo = await Product.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return resp.status(500).json({ msg: "Se me olvido valdar esto" });
  }

  // limpiar img
  if (modelo.img) {
    const pathImg = path.join(__dirname, "../uploads", collection, modelo.img);
    if (fs.existsSync(pathImg)) {
      return resp.sendFile(pathImg);
    }
  }
  const pathImg = path.join(__dirname, "../assets/no-image.jpg");
  resp.sendFile(pathImg);
};

const updateCloudImg = async (req, resp = response) => {
  const { id, collection } = req.params;
  let modelo;
  switch (collection) {
    case "users":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "products":
      modelo = await Product.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return resp.status(500).json({ msg: "Se me olvido valdar esto" });
  }

  // limpiar img
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    await callCloudinary().uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await callCloudinary().uploader.upload(tempFilePath);
  modelo.img = secure_url;
  await modelo.save();
  resp.json(modelo);
};

export { uploadFile, updateImg, showImg, updateCloudImg };
