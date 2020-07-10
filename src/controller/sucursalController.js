'use strict'
var bcrypt = require("bcrypt-nodejs")
var Sucursal=require("../models/sucursal")

function ingresarSucursal(req, res){
    var sucursal = new Sucursal();
    var params = req.body;
  
    if( 
        params.nombre && 
        params.direccion && 
        params.empleados){
            Sucursal.findOne({Nombre: params.nombre}, (err, SucursalGuardada)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(SucursalGuardada){
                    res.send({message: 'La sucursal ya existente'});
                }else{
                  sucursal.nombre = params.nombre;
                  sucursal.direccion = params.direccion;
                  sucursal.empleados = params.empleados;
                  sucursal.producto = params.producto;
  
                    sucursal.save((err, GuardarSucursal)=>{
                        if(err){
                            res.status(500).send({message: 'Error general al guardar'});
                        }else if(GuardarSucursal){
                            res.send({message: 'Sucursal Guardada', Empresa: GuardarSucursal});
                        }else{
                            res.status(418).send({message: 'Error al guardar'});
                        }
                    });
                }
            });
  
    }else{
        res.send({message: 'Ingresa todos los campos'});
    }
  }
  
  function editarSucursal(req, res) {
    var sucursalId = req.params.idsucursal
    var params = req.body;
    Sucursal.findByIdAndUpdate(sucursalId,params,{ new: true },(err, SucursalActualizada) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" });
        if (!SucursalActualizada)
          return res.status(404).send({ message: "No se ha actualizado los datos de la sucursal" });
        return res.status(200).send({ sucursal: SucursalActualizada });
      }
    );
  }
  function EliminarSucursal(req, res) {
    var sucursalId = req.params.id;
    Sucursal.findOneAndDelete(sucursalId, (err, empresaEliminada) => {
      if (err)return res.status(500).send({ message: "Error en la peticion de eliminar la " });
      if (!empresaEliminada)
        return res.status(404).send({ message: "Error al eliminar la empresa" });
      return res.status(200).send({ empresa:empresaEliminada });
    });
  }
  function MostrarSucursales(req ,res){
    
    Sucursal.find((err, sucursal)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion de sucursales'})
        if(!sucursal) return res.status(404).send({message:'Error en la consulta de sucursal'})

        return res.status(200).send({sucursal})
    })

}


  module.exports={
    ingresarSucursal,
    editarSucursal,
    EliminarSucursal,
    MostrarSucursales
  }