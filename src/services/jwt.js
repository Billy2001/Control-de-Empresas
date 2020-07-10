'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret = 'clave_secreta'

exports.createToken= function(empresa){
    var payload={
        sub: empresa._id,
        nombre: empresa.nombre,
        direccion: empresa.direccion,
        email: empresa.email,
        telefono: empresa.telefono,
        iat: moment().unix(),
        exp: moment().day(30,'day').unix()
    }
    return jwt.encode(payload,secret)
}