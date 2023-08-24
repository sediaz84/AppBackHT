const express = require('express');
const router = express.Router();
const { getItems, createItems, updateItems, deleteItems } = require('../controllers/items')

router.get("/", getItems);
router.post("/", createItems);
router.post("/modify", updateItems);
router.delete("/:id", deleteItems);


module.exports = router