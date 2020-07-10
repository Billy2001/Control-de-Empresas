'use strict'
var bcrypt = require("bcrypt-nodejs")
var Empleado=require("../models/empleados")

function ingresarEmpleados(req,res){
    var empleado = new Empleado();
    var params=req.body;

    if(params.nombre && params.puesto&&params.departamento&&params.password){
        empleado.nombre=params.nombre;
        empleado.puesto=params.puesto;
        empleado.departamento=params.departamento;

        Empleado.find((err,empleados)=>{
            if(err)return res.status(500).send({message:'Error en la peticion'})
            if(empleado&&empleado.length>=1){
                return res.status(500).send({message:'El empleado ya esta registrado'})
            }else{
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    empleado.password = hash;
                })
            }
            empleado.save((err,empleadoGuardado)=>{
                if(err)return res.status(500).send({message:'Error al guardar el empleado'})
                if(empleadoGuardado){
                    return res.status(200).send({empleadoGuardado})
                }else{
                    return res.status(404).send({message:'No se pudo guardar el empleado'})
                }
            })
        })
    }else{
        return res.status(200).send({message:'Rellene todos los campos'})
    }
}
function editarEmpleado(req, res) {
    var empleadoId = req.params.idEmpleado
    var params = req.body;
    Empleado.findByIdAndUpdate(empleadoId,params,{ new: true },(err, empleadoActualizada) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" });
        if (!empleadoActualizada)
          return res.status(404).send({ message: "No se ha actualizado los datos del empleado" });
        return res.status(200).send({ empleado: empleadoActualizada });
      }
    );
  }
  function EliminarEmpleado(req, res) {
    var empleadoId = req.params.id;
    Empleado.findOneAndDelete(empleadoId, (err, empleadoEliminado) => {
      if (err)return res.status(500).send({ message: "Error en la peticion de eliminar el Empleado" });
      if (!empleadoEliminado)
        return res.status(404).send({ message: "Error al eliminar el empleado" });
      return res.status(200).send({ empleado:empleadoEliminado });
    });
  }
  function obtenerEmpleados(req,res){
      Empleado.find((err,empleados)=>{
          if(err)return res.status(500).send({message:'Error en la peticion'})
          if(!empleados)return res.status(404).send({message:'Error en la consulta del empleado '})
          return res.status(200).send({empleados})
          
      })
  }
  function FiltroEmpleados(req , res){
    var params = req.body;
    Empleado.find(params,(err , empleadoBuscado)=>{
        if(err)return res.status(500).send({message: 'Error en la peticion'})

        if(!empleadoBuscado)return res.status(404).send({message: 'No se a podido buscar el empleado'})
        return res.status(200).send({empleado: empleadoBuscado})

    })
}
function NoEmpleados(req , res){
    var params = req.body;
    Empleado.countDocuments(params,(err , empleadoBuscado)=>{
        if(err)return res.status(500).send({message: 'Error en la peticion'})

        if(!empleadoBuscado)return res.status(404).send({message: 'No se a podido buscar los empleados'})
        return res.status(200).send({empleado: empleadoBuscado})
    })
}
module.exports={
    ingresarEmpleados,
    obtenerEmpleados,
    EliminarEmpleado,
    editarEmpleado,
    FiltroEmpleados,
    NoEmpleados
}