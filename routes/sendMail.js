const express = require("express")
const {sendMail} = require("../controllers/sendMailController")

const router = express.Router();

router.post('/sendMail',sendMail);

module.exports=router;


