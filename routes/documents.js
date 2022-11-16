const express = require('express');
const router = express.Router();
const { getDocuments, createDocuments, updateDocuments, deleteDocuments } = require ('../controllers/documents');

router.get("/", getDocuments)
router.post("/", createDocuments)
router.put("/:id", updateDocuments)
router.delete("/:id", deleteDocuments)


module.exports = router