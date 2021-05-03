const { Schema, model } = require('mongoose');

const TransferenciaSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'Destinatario',
        required: true
    },
    monto: {
        type: Number,
        required: [ true, 'El monto es requerido' ],
    },
    comentario: {
        type: String
    }

});

TransferenciaSchema.methods.toJSON = function() {
    const { __v, ...transferencia } = this.toObject();
    return transferencia;
}


module.exports = model( 'Transferencia', TransferenciaSchema );