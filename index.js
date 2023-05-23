require('dotenv').config() //Importar paquete dotenv
const { Server }  = require('./models/server')

const server = new Server() //Instanciar el objeto

server.listen()