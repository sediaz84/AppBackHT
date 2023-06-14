const express = require('express');
const router = express.Router();
const { getUsers, createUsers, updateUsers } = require('../controllers/users')
const authMiddleware = require('../middleware/session');

router.get("/", getUsers)
router.post("/", createUsers)
router.put("/:id", updateUsers)  




module.exports = router