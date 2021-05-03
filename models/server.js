const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.authPath = '/api/auth';
        this.destinarioPath = '/api/destinatario';
        this.transferenciaPath = '/api/transferencia';

        //Conectar a la base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del Body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.userPath, require('../routes/user') );
        this.app.use( this.destinarioPath, require('../routes/destinatario') );
        this.app.use( this.transferenciaPath, require('../routes/transferencia') );
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;