const express = require('express');
const router = express.Router();
const { getClientes, getClientesId, createCliente, updateCliente, deleteCliente } = require('../controllers/clientes')
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/roles');


router.get("/", getClientes) 
//router.get("/", authMiddleware, checkRol(["admin"]),  getClientes)
//router.get("/", authMiddleware, getClientes)
router.get("/:id", getClientesId)
router.post("/", createCliente)
router.put("/:id", updateCliente)
router.delete("/:id", deleteCliente)



module.exports = router