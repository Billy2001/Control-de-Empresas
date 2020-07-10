
'use strict'
var bcrypt = require("bcrypt-nodejs");
var Empresa = require("../models/empresa");
var jwt = require("../services/jwt")
function ingresarEmpresa(req,res){
  var empresa = new Empresa();
  var params=req.body;

  if(params.nombre &&
    params.direccion &&
    params.email &&
    params.telefono &&
    params.password){

    empresa.nombre = params.nombre;
    empresa.direccion = params.direccion;
    empresa.email = params.email;
    empresa.telefono = params.telefono;
    empresa.Sucursal = params.Sucursal;
    empresa.productos = params.productos;
    empresa.empleados = params.empleados;

      Empresa.find((err,empresas)=>{
          if(err)return res.status(500).send({message:'Error en la peticion'})
          if(empresa&&empresa.length>=1){
              return res.status(500).send({message:'La empresa ya esta registrado'})
          }else{
              bcrypt.hash(params.password, null, null, (err, hash) => {
                empresa.password = hash;
              })
          }
          empresa.save((err,empresaGuardado)=>{
              if(err)return res.status(500).send({message:'Error al guardar la empresa'})
              if(empresaGuardado){
                  return res.status(200).send({empresaGuardado})
              }else{
                  return res.status(404).send({message:'No se pudo guardar la empresa'})
              }
          })
      })  
  }else{
      return res.status(200).send({message:'Rellene todos los campos'})
  }
}

function editarEmpresa(req, res) {
  var empresaId = req.params.idEmpresa
  var params = req.body;
  Empresa.findByIdAndUpdate(empresaId, params, { new: true }, (err, empresaActualizada) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });
    if (!empresaActualizada)
      return res.status(404).send({ message: "No se ha actualizado los datos de la empresa" });
    return res.status(200).send({ empresa: empresaActualizada });
  }
  );
}
function EliminarEmpresa(req, res) {
  var empresaId = req.params.id;
  Empresa.findOneAndDelete(empresaId, (err, empresaEliminada) => {
    if (err) return res.status(500).send({ message: "Error en la peticion de eliminar la empresa" });
    if (!empresaEliminada)
      return res.status(404).send({ message: "Error al eliminar la empresa" });
    return res.status(200).send({ empresa: empresaEliminada });
  });
}
function obtenerEmpresas(req, res) {

  Empresa.find().populate('Sucursal').populate('productos').populate('empleados   ').exec((err, empresa) => {
    if (err) return res.status(500).send({ message: 'Error en la peticion de la empresa' })
    if (!empresa) return res.status(404).send({ message: 'Error en la consulta de la empresa' })

    return res.status(200).send({ empresa })
  })
}

function login(req, res) {
  var params = req.body;
  Empresa.findOne({ email: params.email }, (err, empresa) => {
    if (err) return res.status(500).send({ message: "Error en la peticion" });
    if (empresa) {
      bcrypt.compare(params.password, empresa.password, (err, check) => {
        if (check) {
          if (params.gettoken) {
            return res.status(200).send({ token: jwt.createToken(empresa) });
          } else {
            empresa.password = undefined;
            return res.status(200).send({ empresa });
          }
        } else {
          return res.status(404).send({ message: "La empresa no se a podido identificar" });
        }
      });
    } else {
      return res.status(404).send({ message: "La empresa no se ha podido blogear" });
    }
  });
}
function insertarSucursal(req, res) {
  var empresa = req.params.idEmpresa;
  var sucursal= req.params.idSucursal;
  
  Empresa.findByIdAndUpdate(empresa,{$push:{Sucursal:{sucursal}}},{new:true},(err,sucursal)=>{
    if(err) return res.status(500).send({message:'Error en la peticion'})
    if(!sucursal)return res.status(404).send({message:'Error al guardar la sucursal'})
    return res.status(200).send({sucursal})
  })
}


module.exports = {
  ingresarEmpresa,
  editarEmpresa,
  EliminarEmpresa,
  obtenerEmpresas,
  login,
  insertarSucursal
}