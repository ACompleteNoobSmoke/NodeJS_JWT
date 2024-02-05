const express = require("express");
const router = express.Router();
const {check} = require("express-validator");

router.post("/signup", (req, res) => {
    const {password, email} = req.body;
    console.log(password, email);
    res.send("Auth Route Working");
})

module.exports = router;