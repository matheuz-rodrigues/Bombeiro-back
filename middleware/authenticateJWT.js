const jwt = require("jsonwebtoken");
const {error, success} = require('../utils/response')

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return error(res, "Token não fornecido", 401)
    }
    const token = authHeader.split(" ")[1];
    if (!token){
        return error(res, "Token inválido", 401)
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded
        next();

    }catch(err){
        return error(res, "Token inválido ou expirado" , 403, err)
    }
}
