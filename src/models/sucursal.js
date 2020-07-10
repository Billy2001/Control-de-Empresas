'use strict'
var mongoose= require("mongoose")
var Schema = mongoose.Schema;

var SucursalSchema=Schema({
    nombre:String,
    direccion:String,
})
module.exports=mongoose.model('sucursal',SucursalSchema)