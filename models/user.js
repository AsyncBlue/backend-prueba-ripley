const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es requerido' ]
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es requerida' ],
    },
    rut: {
        type: String,
        required: [ true, 'El RUT es requerido' ]
    }

});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model( 'User', UserSchema );