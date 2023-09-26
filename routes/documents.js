const express = require('express');
const router = express.Router();
const { getDocuments, getDocumentsId, createDocuments, updateDocuments, deleteDocuments, armadoEntregado } = require ('../controllers/documents');

router.get("/", getDocuments)
router.get("/:id", getDocumentsId)
router.post("/", createDocuments)
router.put("/:id", updateDocuments)
router.put("/", armadoEntregado)
router.delete("/:id", deleteDocuments)


module.exports = router