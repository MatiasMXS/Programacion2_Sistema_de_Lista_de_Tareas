import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.json({ message: "Token no proporcionado" });
  }

  token = token.split(" ")[1];

  try {
    const { uid, nick } = jwt.verify(token, process.env.JWT_SECRET); // devuelve el payload (carga util)
    req.uid = uid;
    req.nick = nick;
    //req.rol_id = rol_id;

    next();
  } catch (error) {
    return res.json({ message: "Token no valido" });
  }
};

// Faltarian roles o perfiles de usuarios (Ej: admin, vendedor, cajero, etc.)

// export const verifyAdmin = (req, res, next) => {
//   if (req.rol_id === 1) {
//     return next();
//   }

//   return res.json({ message: "Acceso no autorizado, solo usuarios admin" });
// };

export const auth = { verifyToken };
