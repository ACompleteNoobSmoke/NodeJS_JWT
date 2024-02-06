const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).send({
                "errors": [
                    {
                        "msg": "Please Login"
                    }
                ]
        })

        try {
             let user = await JWT.verify(token, JWT_SECRET);
             console.log("Here");
             console.log(user);
             req.user = user.email;
             next();
        }catch{
            return res.status(400).send({
                "errors": [
                    {
                        "msg": "Token is invalid"
                    }
                ]
        })

        }
    
   
    
}