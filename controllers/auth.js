const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')

async function comparePassword(passwordForm, passworsBD) {
    const result = await bcrypt.compare(passwordForm, passworsBD);
    return result;
}


const login = async(req, res) => {
    const { nombre, password } = req.body
    
    //Verificar si el email existe
    const usuarios = await Usuario.findOne({nombre})
    try {

        if(!usuarios){//Si encontró el email
            return res.status(400).json({
                msg: 'Correo electrónico no encontrado'
            })
        }
    
        if( !usuarios.estado ){
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })            
        }

        resultado = await comparePassword(password, usuarios.password)

        if(resultado == true){
            return res.status(200).json({
                usuarios
            })  
        }
        else{
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })  
        }
        
    } catch (error) {
        return res.status(400).json({
            msg: 'Apreciado usuario contacte al administrador.'
        })
    }
}

module.exports = {
    login
}