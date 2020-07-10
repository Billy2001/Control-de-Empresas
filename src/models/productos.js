'use strict'
var mongoose=require("mongoose")
var Schema=mongoose.Schema;

var ProductoSchema = Schema({
    nombre:String,
    Descripcion: String
})
module.exports=mongoose.model('productos',ProductoSchema)
