import { response, request } from "express";
const esAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validad el token primero",
    });
  }
  const { rol, nombre } = req.user;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }
  next();
};

const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validad el token primero",
      });
    }
    if (roles.includes(req.user.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }
    next();
  };
};

export { esAdminRole, tieneRol };
