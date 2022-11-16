const express = require('express');
const router = express.Router();
const { getUsers, createUsers, updateUsers, deleteUsers } = require('../controllers/users')

router.get("/", getUsers)
router.post("/", createUsers)
router.put("/:id", updateUsers)
router.delete("/:id", deleteUsers)



module.exports = router