import pool from "../config/db.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
let idUsuario;

const findByUsername = async (nick) => {
  const [row] = await pool.query("SELECT * FROM usuario WHERE nick = ?", [
    nick,
  ]);
  return row[0];
};

export const register = async (req, res) => {
  const {nick,contraseña} = req.body;

  try {
    const usuario = await findByUsername(nick);
    if (usuario) {
      return res.json({ message: "Usuario ya existe" });
    }

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    const [result] = await pool.query(
      "INSERT INTO usuario (nick, contraseña) VALUES (?, ?)",
      [nick, contraseñaHasheada]
    );
    res.json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.json(error.message);
  }
};

export const login = async (req, res) => {
  const {nick,contraseña} = req.body;

  try {
    const usuario = await findByUsername(nick);
    if (!usuario) {
      return res.json({ message: "Usuario y/o contraseña son incorrectos" });
    }

    const isValid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isValid) {
      return res.json({ message: "Usuario y/o contraseña son incorrectos" });
    }

    const token = jwt.sign(
      { uid: usuario.uid, nick: usuario.nick },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    idUsuario=usuario.uid;

    res.json({ token: token });
  } catch (error) {
    console.log(error.message);
  }
};

export function idUsuariofun (){
  return idUsuario;
};


//export idUsuario;