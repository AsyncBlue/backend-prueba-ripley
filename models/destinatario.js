const { Schema, model } = require('mongoose');

const DestinatarioSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nombre: {
        type: String,
        required: [ true, 'El nombre es requerido' ]
    },
    correo: {
        type: String,
        required: [ true, 'El correo es requerido' ]
    },
    rut: {
        type: String,
        required: [ true, 'El RUT es requerido' ]
    },
    telefono: {
        type: Number,
        required: [ true, 'El Telefono es requerido' ]
    },
    banco: {
        type: String,
        required: [ true, 'El banco es requerido' ]
    },
    cuenta: {
        type: String,
        required: [ true, 'El tipo de cuenta es requerido' ]
    },
    numeroCuenta: {
        type: Number,
        required: [ true, 'El numero de cuenta es requerido' ]
    }

});

DestinatarioSchema.methods.toJSON = function() {
    const { __v, ...destinatario } = this.toObject();
    return destinatario;
}


module.exports = model( 'Destinatario', DestinatarioSchema );