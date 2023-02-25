const express = require('express');
const router = express.Router();
const { getClientes, createCliente, updateCliente, deleteCliente } = require('../controllers/clientes')
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/roles');


router.get("/", authMiddleware, checkRol(["admin"]),  getClientes)
router.post("/", createCliente)
router.put("/:id", updateCliente)
router.delete("/:id", deleteCliente)



module.exports = router