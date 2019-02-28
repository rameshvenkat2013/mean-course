const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.header.authorization.split(" ")[1];
        jwt.verify(token, "jwt_secret_web_token_for_encryption");
        next();
    }catch(error){
        res.status(401).json({
            message: 'Prot: Authorization Failed'
        });
    }
};