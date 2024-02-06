require('dotenv').config();
const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const {users} = require("../db");
const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", [
    check("email", "Please provide a valid email").isEmail(),
     check("password", "Please provide a password that is greater than 5 characters").isLength({
    min: 6
})], async (req, res) => {
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
                "msg": "This user already exists!!"
            }
        ]
    })

    const hashedPassword = await bcrypt.hash(reqPassword, 10);
    users.push({
        email: reqEmail, 
        password: hashedPassword
    })

    const token = await JWT.sign({
        reqEmail
    }, JWT_SECRET, {
        expiresIn: 360000
    })
    res.send({
        token
    })
})

router.post('/login', async (req, res) => {
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;

    let user = users.find(({email}) => email === reqEmail);
    if(!user) return res.status(400).send({
        "errors": [
            {
                "msg": "Invalid Credentials!"
            }
        ]
    });

    let isMatch = await bcrypt.compare(reqPassword, user.password);

    if(!isMatch) return res.status(400).send({
        "errors": [
            {
                "msg": "Invalid Credentials!"
            }
        ]
    });

    const token = await JWT.sign({
        reqEmail
    }, JWT_SECRET, {
        expiresIn: 360000
    })
    res.send({
        token
    })

})


router.get("/all", (req, res) => {
    res.status(200).send(users);
})

module.exports = router;