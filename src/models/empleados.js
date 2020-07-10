'use strict'
var mongoose = require("mongoose")
var Schema= mongoose.Schema;

var EmpleadosSchema =Schema({
    nombre:String,
    puesto:String,
    departamento:String,
    password:String

    
})
module.exports=mongoose.model('Empleados',EmpleadosSchema); 