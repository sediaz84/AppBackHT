const express = require('express');
const router = express.Router();
const { getDocumentsIn, createDocumentsIn, getInDocumentId } = require('../controllers/documentsIn')

router.get("/", getDocumentsIn)
router.get("/:id", getInDocumentId)
router.post("/", createDocumentsIn)
router.put("/:id")
router.delete("/:id")

module.exports = router;