const express = require('express');
const router = express.Router();
const { getDocuments, getDocumentsId, createDocuments, updateDocuments, deleteDocuments, 
    armadoEntregado, aprobadoDesaprobado, getApproved, getArmado, putArmado } = require ('../controllers/documents');

router.get("/", getDocuments)
router.get("/approved", getApproved)
router.get("/armado", getArmado)
router.get("/:id", getDocumentsId)
router.post("/", createDocuments)
router.put("/:id", updateDocuments)
router.put("/", armadoEntregado)
router.put("/approved/:id", aprobadoDesaprobado)//dar de baja despues de actualizaciones
router.put("/approved/armado/:id", putArmado)
router.delete("/:id", deleteDocuments)


module.exports = router