'use strict'
var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    nombre:String,
    direccion:String,
    email:String,
    telefono:String,
    password:String,
    Sucursal:{type: Schema.Types.ObjectId,ref:'sucursal'},
    productos:{type:Schema.Types.ObjectId,ref:'productos'},
    empleados: { type: Schema.Types.ObjectId, ref: 'Empleados'}
    
})    
module.exports=mongoose.model('empresa',EmpresaSchema);