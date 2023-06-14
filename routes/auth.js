const express = require('express');
const router = express.Router();
const { login } = require('../controllers/users')

//const authMiddleware = require('../middleware/session');


router.post("/login", login)




module.exports = router