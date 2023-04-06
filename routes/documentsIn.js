const express = require('express');
const router = express.Router();
const { getDocumentsIn, createDocumentsIn } = require('../controllers/documentsIn')

router.get("/", getDocumentsIn)
router.post("/", createDocumentsIn)
router.put("/:id")
router.delete("/:id")

module.exports = router;