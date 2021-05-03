const User = require('../models/user');

const mailExists = async ( correo = '' ) => {

    const existsMail = await User.findOne( { correo } );
    if ( existsMail ) {
        throw new Error( `El correo: ${ correo } ya esta registrado` );
    }

}

const existsUserId = async ( id ) => {

    const existsUser = await User.findById( id );
    if ( !existsUser ) {
        throw new Error( `El ID: ${ id } no existe` );
    }

}

const rutExists = async ( rut = '' ) => {

    const existsRut = await User.findOne( { rut } );
    if ( existsRut ) {
        throw new Error( `El RUT: ${ rut } ya esta registrado` );
    }

}


module.exports = {
    mailExists,
    existsUserId,
    rutExists
}