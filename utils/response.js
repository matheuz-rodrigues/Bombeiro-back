function success(res, message, data = null){
    return res.status(200).json({
        success: true,
        message,
        data,
        errors:null,
        timestamp: new Date().toString()
    });
}

function error (res, message, status=400, erros=null){
    return res.status(status).json({
        success: false,
        message,
        data:null,
        erros,
        timestamp: new Date().toString()

    })
}

module.exports = {success, error}