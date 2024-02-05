const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const users = require("../db");

router.post("/signup", [
    check("email", "Please provide a valid email").isEmail(),
     check("password", "Please provide a password that is greater than 5 characters").isLength({
    min: 6
})], (req, res) => {
    const reqPassword = req.body.password;
    const reqEmail = req.body.email;

    // Validated the input
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send({
        errors: errors.array()
    })

    // Validated if user doesn't already exist
    let user = users.find(({email, password}) => email === reqEmail && password === reqPassword);
    if(user) return res.status(400).send({
        "errors": [
            {
                "msg": "This user already exists!"
            }
        ]
    })
    res.send("Auth Route Working");
})

module.exports = router;