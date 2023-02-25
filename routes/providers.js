const express = require('express');
const router = express.Router();
const { getProviders, createProviders, updateProviders, deleteProviders } = require('../controllers/providers')

router.get("/", getProviders)
router.post("/", createProviders)
router.put("/:id", updateProviders)
router.delete("/:id", deleteProviders)


module.exports = router