const express = require('express');
const router = express.Router();
const { getDocuments, getDocumentsId, createDocuments, updateDocuments, deleteDocuments, 
    armadoEntregado, aprobadoDesaprobado, getApproved } = require ('../controllers/documents');

router.get("/", getDocuments)
router.get("/approved", getApproved)
router.get("/:id", getDocumentsId)
router.post("/", createDocuments)
router.put("/:id", updateDocuments)
router.put("/", armadoEntregado)
router.put("/approved/:id", aprobadoDesaprobado)
router.delete("/:id", deleteDocuments)


module.exports = router