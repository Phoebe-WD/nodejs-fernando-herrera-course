import { Schema, model } from "mongoose";

const ProductSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  descripcion: { type: String },
  disponible: { type: Boolean, default: true },
  img: { type: String },
});

ProductSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

export default model("Product", ProductSchema);
