'use strict'
var bcrypt = require("bcrypt-nodejs")
var Producto=require("../models/productos")

function ingresarProducto(req, res){
    var producto = new Producto();
    var params = req.body;
  
    if( 
        params.nombre && 
        params.Descripcion ){
            Producto.findOne({Nombre: params.nombre}, (err, ProductoGuardado)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(ProductoGuardado){
                    res.send({message: 'El producto ya existente'});
                }else{
                  producto.nombre = params.nombre;
                  producto.Descripcion = params.Descripcion;
                  producto.save((err, GuardarProducto)=>{
                        if(err){
                            res.status(500).send({message: 'Error general al guardar'});
                        }else if(GuardarProducto){
                            res.send({message: 'Sucursal Guardada',Producto:GuardarProducto});
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
  
  function editarProducto(req, res) {
    var ProductoId = req.params.idProducto
    var params = req.body;
    Producto.findByIdAndUpdate(ProductoId,params,{ new: true },(err, ProductoActualizado) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" });
        if (!ProductoActualizado)
          return res.status(404).send({ message: "No se ha actualizado los datos del Producto" });
        return res.status(200).send({ Producto: ProductoActualizado });
      }
    );
  }
  function EliminarProducto(req, res) {
    var ProductoId = req.params.idProducto;
    Producto.findOneAndDelete(ProductoId, (err, ProductoEliminado) => {
      if (err)return res.status(500).send({ message: "Error en la peticion de eliminar la " });
      if (!ProductoEliminado)
        return res.status(404).send({ message: "Error al eliminar la empresa" });
      return res.status(200).send({ Producto:ProductoEliminado });
    });
  }
  function ListarProductos(req ,res){
    
    Producto.find((err, producto)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion del producto'})
        if(!producto) return res.status(404).send({message:'Error en la consulta del Producto'})

        return res.status(200).send({producto})
    })

}
module.exports={
    ingresarProducto,
    editarProducto,
    ListarProductos,
    EliminarProducto
}