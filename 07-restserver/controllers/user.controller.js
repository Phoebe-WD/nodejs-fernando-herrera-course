import { response, request } from "express";

const userGet = (req = request, res = response) => {
  const { q, nombre = "no name" } = req.query;
  res.json({
    msg: "get api",
    q,
    nombre,
  });
};
const userPut = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "put api",
    id,
  });
};
const userPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: "post api",
    nombre,
    edad,
  });
};
const userPatch = (req = request, res = response) => {
  res.json({
    msg: "patch api",
  });
};
const userDelete = (req = request, res = response) => {
  res.json({
    msg: "delete api",
  });
};

export { userGet, userPut, userPost, userPatch, userDelete };
