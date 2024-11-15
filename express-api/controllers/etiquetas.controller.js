import pool from "../config/db.js";
import { idUsuariofun } from "./auth.controller.js";

// Obtener todas las tareas
const findAll = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM etiquetas WHERE usuario_id = ?", [idUsuariofun()]);
        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener las etiquetas', error });
    }
};

// Obtener una tarea por ID
const findById = async (req, res) => {
    const { id } = req.params;
    try {
        const [row] = await pool.query("SELECT * FROM etiquetas WHERE id = ?", [
            id,
          ]);
        if (row.length != 1) {
            return res.status(404).send({ mensaje: 'Tarea no encontrada' });
        }
        res.status(200).send(row[0]);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener la etiquetas', error });
    }
};

// Obtener una etiqueta por Nombre
const findByNombre = async (req, res) => {
    const { nombre } = req.params;
    
    try {
      const [row] = await pool.query("SELECT * FROM etiquetas WHERE LOWER(nombre) = LOWER(?) and usuario_id = ?", [nombre, idUsuariofun()]);
      if (row.length === 0) {
        return res.status(404).send({ mensaje: "Tarea no encontrada" });
      }
      res.status(200).send(row[0]);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al obtener la tarea", error });
    }
  };

// Crear una nueva etiquetas
const create = async (req, res) => {
    const { nombre, color } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO etiquetas (nombre, color, usuario_id) VALUES (?, ?, ?)",
            [nombre, color, idUsuariofun()]
          );
        res.status(201).send({ id: result.insertId }); 
    } catch (error) {
        res.status(400).send(error); 
    }
};

// Actualizar una etiquetas por ID
const update = async (req, res) => {
    const { id } = req.params;
    const { nombre, color } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE etiquetas SET nombre = ?, color = ? WHERE  id = ?",
            [nombre, color, id]
          );
        if (result.affectedRows === 1) {
            res.json({ message: "Registro actualizado" });
          } else {
            res.json({ message: "Registro inexistente" });
          }
        
    } catch (error) {
        res.status(400).send({ mensaje: 'Error al actualizar la etiquetas', error});
    }
};

// Eliminar una etiquetas por ID
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM etiquetas WHERE id = ?", [
            id,
          ]);
        if (result.affectedRows != 1) {
            return res.status(404).send({ mensaje: 'etiquetas no encontrada' });
        }
        res.status(200).send({ mensaje: 'etiquetas eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar la etiquetas', error });
    }
};

const Create_tarea_etiqueta = async (req, res) => {
    const { tarea_id, etiqueta_id } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO tareas_etiquetas (tarea_id,etiqueta_id) VALUES (?, ?)",
            [tarea_id, etiqueta_id]
          );
        res.status(201).send({ id: result.insertId }); 
    } catch (error) {
        res.status(400).send(error); 
    }
};
const Delete_tarea_etiqueta = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM tareas_etiquetas WHERE id = ?", [
            id,
          ]);
        if (result.affectedRows != 1) {
            return res.status(404).send({ mensaje: 'relacion no encontrada' });
        }
        res.status(200).send({ mensaje: 'realacion eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar la etiquetas', error });
    }
};


export const etiquetasController = {
    findAll,
    findById,
    findByNombre,
    create,
    update,
    remove,
    Create_tarea_etiqueta,
    Delete_tarea_etiqueta
  };