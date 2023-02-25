const express = require('express');
const router = express.Router();
const { getUsers, createUsers, updateUsers, deleteUsers, login } = require('../controllers/users')
const authMiddleware = require('../middleware/session');

router.get("/", getUsers)
router.post("/", authMiddleware, createUsers)
router.post("/login", login)
router.put("/:id", updateUsers)  
router.delete("/:id", deleteUsers)



module.exports = router