'use strict'
var express=require("express")
var empleadoController=require("../controller/empleadosController")
var productosController=require("../controller/productosController")
var api=express.Router()

api.post('/ingresarEmpleados',empleadoController.ingresarEmpleados)
api.put('/editarEmpleado/:idEmpleado',empleadoController.editarEmpleado)
api.delete('/eliminarEmpleado/:id',empleadoController.EliminarEmpleado)
api.get('/BuscarEmpleados',empleadoController.obtenerEmpleados)
api.get('/FitroEmpleado',empleadoController.FiltroEmpleados)
api.get('/NoEmpleados',empleadoController.NoEmpleados)
//Ruta Productos
api.post('/ingresarProducto',productosController.ingresarProducto)
api.put('/editarProducto/:idProducto',productosController.editarProducto)
api.get('/ListarProductos',productosController.ListarProductos)
api.delete('/EliminarSucursal/:idProducto',productosController.EliminarProducto)
module.exports=api;
