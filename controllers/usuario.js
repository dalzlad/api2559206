//Importar paquetes requeridos de Node
const {response} = require('express')
const bcrypt = require('bcrypt') //Encriptar

//Importación de los modelos
const Usuario = require('../models/usuario')

//Consultar
const usuarioGet = async(req, res = response) =>{
    const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const usuarios = await Usuario.find()
    /*.find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
*/
    res.json({
        usuarios
    })   
}

//Registrar
const usuarioPost = async(req, res = response) => {
    const body = req.body //Captura de atributos
    let mensaje = ''
    //const {nombre, password, rol, estado} = req.query
    console.log(body)
    try {
        const usuario = new Usuario(body) //Instanciar el objeto   
        //console.log(bcrypt.hashSync(body.password, 10))
        const salt = 10
        usuario.password = bcrypt.hashSync(body.password, salt)
        mensaje = 'El registro se realizó exitosamente'
        await usuario.save()
    } catch (error) {
        console.log(error)
        if (error) {
            if (error.name === 'ValidationError') {
               console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            }
        }
        console.log(mensaje)
    }
}


//Modificar
const usuarioPut = async(req, res = response) => {

    const {nombre, password, rol, estado} = req.body
    let mensaje = ''

    try{
        const usuario = await Usuario.findOneAndUpdate({nombre: nombre},{password: bcrypt.hashSync(body.password, 10), rol:rol, estado:estado})
        mensaje = 'La modificación se efectuó exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })
}

//Modificar
const usuarioDelete = async(req, res = response) => {

    const {_id} = req.body
    let mensaje = ''

    try{
        const usuario = await Usuario.deleteOne({_id: _id})
        mensaje = 'La eliminiación se efectuó exitosamente.'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}

/*Crear una API con los métodos GET y POST para registrar y consultar
en una colección el número de ambiente, la fecha, hora, temperatura y 
nombre usuario

*Desplegar la API en render o el servidor de su preferencia
*/
