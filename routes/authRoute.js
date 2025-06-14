const express = require('express');
const { signin, signup } = require('../controllers/authcontroller');

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);

module.exports=router;