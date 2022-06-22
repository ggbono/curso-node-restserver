const express = require('express')
var cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        // middlewares
        this.middlewares();
        //rutas de mi aplicacion

        this.routes();
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
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVIDOR CORRIENDO EN PUERTO', this.port)
        })
    }

}

module.exports = Server;