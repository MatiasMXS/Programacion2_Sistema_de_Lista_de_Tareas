import { Router } from "express";
import { tareasController } from "../controllers/tareas.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/', auth.verifyToken, tareasController.findAll);
router.get('/:id', auth.verifyToken, tareasController.findById);
router.get('/nombre/:nombre', auth.verifyToken, tareasController.findByNombre);
router.get('/etiqueta/:id', auth.verifyToken, tareasController.findByEtiqueta);
router.post('/', auth.verifyToken, tareasController.create);
router.put('/:id', auth.verifyToken, tareasController.update);
router.put('/check/:id', auth.verifyToken, tareasController.checkUpdate);
router.delete('/:id', auth.verifyToken, tareasController.remove);
router.get('/prioridad/:prioridad',auth.verifyToken, tareasController.priority);
router.get('/proximas-vencer/:dias',auth.verifyToken, tareasController.end);
router.get('/buscar/:materia',auth.verifyToken, tareasController.subject);

export default router;