const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath='/api/auth';
        // connect with db 
        this.connectDb()

        // middlewares
        this.middlewares();
        //rutas de mi aplicacion

        this.routes();
    }

    async connectDb() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Directorio publico
        this.app.use(express.static('public'))
        // PARSEO Y LECTURA DEL BODY
        this.app.use(express.json());

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVIDOR CORRIENDO EN PUERTO', this.port)
        })
    }

}

module.exports = Server;