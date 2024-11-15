import pool from "../config/db.js";
import { idUsuariofun } from "./auth.controller.js";

// Obtener todas las tareas
const findAll = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tareas WHERE usuario_id = ?", [idUsuariofun()]);
    res.status(200).send(rows);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener las tareas", error });
  }
};

// Obtener una tarea por ID
const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await pool.query("SELECT * FROM tareas WHERE id = ?", [id]);
    if (row.length != 1) {
      return res.status(404).send({ mensaje: "Tarea no encontrada" });
    }
    res.status(200).send(row[0]);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener la tarea", error });
  }
};

// Obtener una tarea por Nombre
const findByNombre = async (req, res) => {
  const { nombre } = req.params;
  
  try {
    const [row] = await pool.query("SELECT * FROM tareas WHERE LOWER(nombre) = LOWER(?) and usuario_id = ?", [nombre, idUsuariofun()]);
    if (row.length === 0) {
      return res.status(404).send({ mensaje: "Tarea no encontrada" });
    }
    res.status(200).send(row[0]);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener la tarea", error });
  }
};

// Crear una nueva tarea
const create = async (req, res) => {
  const { nombre, descripcion, fecha_Limite, prioridad, estado, materia } =
    req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO tareas (nombre, descripcion, fecha_Limite, prioridad, estado, materia, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, descripcion, fecha_Limite, prioridad, estado, materia, idUsuariofun()]
    );

    res.status(201).send({ id: result.insertId });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Actualizar una tarea por ID
const update = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha_Limite, prioridad, estado, materia } =
    req.body;
  try {
    const [result] = await pool.query(
      "UPDATE tareas SET nombre = ?, descripcion = ?, fecha_Limite = ?, prioridad = ?, estado = ?, materia = ? WHERE id = ?",
      [nombre, descripcion, fecha_Limite, prioridad, estado, materia, id]
    );
    if (result.affectedRows === 1) {
      res.json({ message: "Registro actualizado" });
    } else {
      res.json({ message: "Registro inexistente" });
    }
  } catch (error) {
    res.status(400).send({mensaje: "Error al actualizar la tarea",});
  }
};

// Eliminar una tarea por ID
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM tareas WHERE id = ?", [id]);
    if (result.affectedRows != 1) {
      return res.status(404).send({ mensaje: "Tarea no encontrada" });
    }
    res.status(200).send({ mensaje: "Tarea eliminado correctamente" });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al eliminar la tarea", error });
  }
};

//end points de negocio

const priority = async (req, res) => {
  const { prioridad } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tareas WHERE prioridad = ?",
      [prioridad]
    );
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.json({ message: "Tarea no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ mensaje: "Error al buscar tareas", error });
  }
};

const end = async (req, res) => {
  const dias = parseInt(req.params.dias);
  let fechaactual = new Date();
  let fechafinal = new Date();
  fechafinal.setDate(fechaactual.getDate() + dias);
  fechaactual = fechaactual.toISOString().slice(0, 19).replace("T", " ");
  fechafinal = fechafinal.toISOString().slice(0, 19).replace("T", " ");

  try {
    const [rows] = await pool.query(
      "SELECT * FROM tareas WHERE fecha_Limite BETWEEN ? AND ?",
      [fechaactual, fechafinal]
    );
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.json({
        message: "No se encontraron tareas con los criterios proporcionados",
      });
    }
  } catch (error) {
    res.status(500).send({ mensaje: "Error al buscar tareas", error });
  }
};

const subject = async (req, res) => {
  const { materia } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM tareas WHERE materia = ?", [
      materia,
    ]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.json({
        message: "No se encontraron tareas con los criterios proporcionados",
      });
    }
  } catch (error) {
    res.status(500).send({ mensaje: "Error al buscar tareas", error });
  }
};

export const tareasController = {
  findAll,
  findById,
  findByNombre,
  create,
  update,
  remove,
  priority,
  end,
  subject,
};
