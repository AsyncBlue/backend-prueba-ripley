const { response, request } = require('express');

const Destinatario = require('../models/destinatario');

const verDestinatarios = async ( req = request, res = response ) => {

    const { user } = req;
    
    const [ total, destinatarios ] = await Promise.all([
        Destinatario.countDocuments( { user } ),
        Destinatario.find( { user } ).populate( 'user' )
    ]);

    res.json({
        total,
        destinatarios
    });

}

const crearDestinatario = async ( req, res = response ) => {
    
    const { user } = req;
    
    const { nombre, correo, rut, telefono, banco, cuenta, numeroCuenta } = req.body;

    const destinatario = new Destinatario( { user, nombre, correo, rut, telefono, banco, cuenta, numeroCuenta } );

    await destinatario.save();

    res.json({
        destinatario
    });

}

const verDestinatarioPorID = async ( req = request, res = response ) => {

    const { id } = req.params;
    
    const destinatario = await Destinatario.findById( id ).populate( 'user' );

    res.json( destinatario );

}


module.exports = {
    verDestinatarios,
    crearDestinatario,
    verDestinatarioPorID
}