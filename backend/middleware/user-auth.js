const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req)
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "jwt_secret_web_token_for_encryption");
        next();
    }catch(error){
        res.status(401).json({
            message: 'Prot: Authorization Failed'
        });
    }
};