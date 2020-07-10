'use strict'
var express= require("express")
var empresaController = require("../controller/empresaController")
var sucursalController=require("../controller/sucursalController")
var md_auth = require('../middleware/authenticated')

var api=express.Router()

api.post('/ingresarEmpresa',empresaController.ingresarEmpresa)
api.put('/editarEmpresa/:idEmpresa',empresaController.editarEmpresa)
api.delete('/Eliminar/:id',empresaController.EliminarEmpresa)
api.get('/BuscarEmpresas',empresaController.obtenerEmpresas)
api.post('/login',empresaController.login)
api.put('/insertarSucursal/:idEmpresa',md_auth.ensureAuth,empresaController.insertarSucursal)
//sucursal Routes
api.post('/ingresarSucursal',sucursalController.ingresarSucursal)
api.put('/editarSucursal/:idsucursal',sucursalController.editarSucursal)
api.delete('/eleminarSucursal/:idsucursal',sucursalController.EliminarSucursal)
api.get('/mostrarSucursales',sucursalController.MostrarSucursales)
module.exports=api;