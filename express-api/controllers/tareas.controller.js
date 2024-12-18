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
    const [rows] = await pool.query("SELECT * FROM tareas WHERE nombre LIKE '"+ nombre + "%' and usuario_id = ?", [idUsuariofun()]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.json({ message: "Tareas no encontradas" });
    }
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener la tarea", error });
  }
};

const findByEtiqueta = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT tareas.id, tareas.nombre, tareas.descripcion, tareas.fecha_Limite, tareas.prioridad, tareas.estado, tareas.materia, tareas.usuario_id FROM tareas INNER JOIN tareas_etiquetas on tareas.id=tarea_id WHERE etiqueta_id=? and usuario_id=?;",
      [id, idUsuariofun()]
    );
    res.status(200).send(rows);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener las etiquetas", error });
  }
};

// Crear una nueva tarea
const create = async (req, res) => {
  const { nombre, descripcion, fecha_Limite, prioridad, materia } =
    req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO tareas (nombre, descripcion, fecha_Limite, prioridad, materia, usuario_id) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, descripcion, fecha_Limite, prioridad, materia, idUsuariofun()]
    );

    res.status(201).send({ id: result.insertId });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Actualizar una tarea por ID
const update = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha_Limite, prioridad, materia } =
    req.body;
  try {
    const [result] = await pool.query(
      "UPDATE tareas SET nombre = ?, descripcion = ?, fecha_Limite = ?, prioridad = ?, materia = ? WHERE id = ?",
      [nombre, descripcion, fecha_Limite, prioridad, materia, id]
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


// Actualizar Check una tarea por ID
const checkUpdate = async (req, res) => {
  const { id } = req.params;
    req.body;
  try {
    const [result] = await pool.query("UPDATE tareas SET estado = CASE WHEN estado = 1 THEN 0 ELSE 1 END WHERE id = ?", [id]);
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

    const [rows] = await pool.query(
      "SELECT * FROM tareas_etiquetas WHERE tarea_id = ?",
      [id]
    );
    if (rows.affectedRows != 0) {
    await pool.query("DELETE FROM tareas_etiquetas WHERE tarea_id = ?", [id]);
};
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
      "SELECT * FROM tareas WHERE usuario_id =? AND fecha_Limite BETWEEN ? AND ?",
      [idUsuariofun(),fechaactual, fechafinal]
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
  findByEtiqueta,
  create,
  update,
  checkUpdate,
  remove,
  priority,
  end,
  subject,
};
