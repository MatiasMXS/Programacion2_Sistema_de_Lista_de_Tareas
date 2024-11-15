import { Router } from "express";
import { etiquetasController } from "../controllers/etiquetas.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/', auth.verifyToken, etiquetasController.findAll);
router.get('/:id', auth.verifyToken, etiquetasController.findById);
router.get('/nombre/:nombre', auth.verifyToken, etiquetasController.findByNombre);
router.post('/', auth.verifyToken, etiquetasController.create);
router.put('/:id', auth.verifyToken, etiquetasController.update);
router.delete('/:id', auth.verifyToken, etiquetasController.remove);
router.post('/C_Tarea', auth.verifyToken, etiquetasController.Create_tarea_etiqueta);
router.delete('/D_Tarea/:id', auth.verifyToken, etiquetasController.Delete_tarea_etiqueta);


export default router;