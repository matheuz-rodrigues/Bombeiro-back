const {error} = require("../utils/response")
exports.requireAdmin = (req, res, next) => {
    if (!req.user) {
        return error(res, "Usuario não autenticado", 401)
    }

    if (req.user.role !== 'ADMIN') {
        return error(res, "Acesso negado", 404, req.user)
    }

    next();
};
