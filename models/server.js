const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categoria: '/api/categoria',
            usuario: '/api/usuarios',
            productos: '/api/productos',
            buscar: '/api/buscar'
        }
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
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.usuario, require('../routes/user'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.categoria, require('../routes/categorias'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVIDOR CORRIENDO EN PUERTO', this.port)
        })
    }

}

module.exports = Server;