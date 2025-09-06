const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controller/ocorrenciaController');
const roleMiddleware = require('../middleware/roleMiddleware')
const authenticateJWT = require('../middleware/authenticateJWT')


router.post('/createOcorrencia', authenticateJWT.authenticateJWT, roleMiddleware.requireAdmin, ocorrenciaController.createOcorrencia);
router.get('/all', authenticateJWT.authenticateJWT, ocorrenciaController.getOcorrencias);
router.get('/:id', authenticateJWT.authenticateJWT, ocorrenciaController.getOcorrenciaById);
router.put('/:id', authenticateJWT.authenticateJWT, roleMiddleware.requireAdmin, ocorrenciaController.updateOcorrencia);
router.delete('/:id', authenticateJWT.authenticateJWT, roleMiddleware.requireAdmin, ocorrenciaController.deleteOcorrencia);

module.exports = router;