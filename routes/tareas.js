const express = require('express');
const router = express.Router();
const ModelTareas = require('../models/tareamodel');

// Obtener todas las tareas
router.get('/tareas', async (req, res) => {
    try {
        const tareas = await ModelTareas.find(); 
        res.status(200).send(tareas);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener las tareas', error });
    }
});

// Crear una nueva tarea
router.post('/tareas', async (req, res) => {
    const body = req.body;
    try {
        const nuevaTarea = await ModelTareas.create(body); 
        res.status(201).send(nuevaTarea); 
    } catch (error) {
        res.status(400).send(error); 
    }
});

// Obtener una tarea por ID
router.get('/tareas/:id', async (req, res) => {
    try {
        const tarea = await ModelTareas.findById(req.params.id); 
        if (!tarea) {
            return res.status(404).send({ mensaje: 'Tarea no encontrada' });
        }
        res.status(200).send(tarea);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener la tarea', error });
    }
});

// Actualizar una tarea por ID
router.put('/tareas/:id', async (req, res) => {
    try {
        const tareaActualizada = await ModelTareas.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tareaActualizada) {
            return res.status(404).send({ mensaje: 'Tarea no encontrada' });
        }
        res.status(200).send(tareaActualizada);
    } catch (error) {
        res.status(400).send({ mensaje: 'Error al actualizar la tarea', error });
    }
});

// Eliminar una tarea por ID
router.delete('/tareas/:id', async (req, res) => {
    try {
        const tareaEliminada = await ModelTareas.findByIdAndDelete(req.params.id); 
        if (!tareaEliminada) {
            return res.status(404).send({ mensaje: 'Tarea no encontrada' });
        }
        res.status(200).send({ mensaje: 'Tarea eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar la tarea', error });
    }
});

//end points de negocio

router.put('/tareas/:id/completar', async (req, res) => {
    try {

        const tarea = await ModelTareas.findById(req.params.id);

        if (!tarea) {
            return res.status(404).send({ mensaje: 'Tarea no encontrada' });
        }
        
        if (tarea.completada === false){
        tarea.completada = true;
        } else {
            tarea.completada = false;
        }

        await tarea.save();
        res.status(200).send(tarea);

    } catch (error) {
        res.status(400).send({ mensaje: "Error al actualizar el estado de la tarea", error });
    }
});

router.get('/tareas/prioridad/:nivel', async (req, res) => {
    const prioridad = req.params.nivel; 

    try {
        const query = {};
        if (prioridad) query.prioridad = prioridad;

        const tareas = await ModelTareas.find(query);
        if (!tareas.length) {
            return res.status(404).send({ mensaje: 'No se encontraron tareas con los criterios proporcionados' });
        }

        res.status(200).send(tareas); 
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar tareas', error });
    }
});


router.get('/tareas/proximas-vencer/:dias', async (req, res) => {
    const dias = parseInt(req.params.dias); 
    const fechaactual = new Date();
    const fechafinal = new Date();
    fechafinal.setDate(fechaactual.getDate()+dias);

    try {
        const tareas = await ModelTareas.find({
            fechaLimite: { $gte: fechaactual, $lt: fechafinal } 
        });


        if (!tareas.length) {
            return res.status(404).send({ mensaje: 'No se encontraron tareas con los criterios proporcionados' });
        }

        res.status(200).send(tareas); 
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar tareas', error });
    }
});

router.get('/tareas/buscar/:materia', async (req, res) => {
    const materia = req.params.materia; 

    try {
        const query = {};
        if (materia) query.materia = materia;

        const tareas = await ModelTareas.find(query);
        if (!tareas.length) {
            return res.status(404).send({ mensaje: 'No se encontraron tareas con los criterios proporcionados' });
        }

        res.status(200).send(tareas); 
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar tareas', error });
    }
});

module.exports = router;
