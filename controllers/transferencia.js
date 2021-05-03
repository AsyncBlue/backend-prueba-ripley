const { response, request } = require('express');

const Transferencia = require('../models/transferencia');

const verTransferencias = async ( req = request, res = response ) => {

    const { user } = req;
    
    const [ total, transferencias ] = await Promise.all([
        Transferencia.countDocuments( { user } ),
        Transferencia.find( { user } ).populate( 'user' ).populate( 'destinatario' ).sort( { field: 'desc' } )
    ]);

    res.json({
        total,
        transferencias
    });

}

const crearTransferencia = async ( req, res = response ) => {

    const { user } = req;

    const { destinatario, monto, comentario } = req.body;
    const transferencia = new Transferencia( { user, destinatario, monto, comentario } );
 
    await transferencia.save();

    res.json({
        transferencia
    });

}

module.exports = {
    verTransferencias,
    crearTransferencia
}