const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const User = require('../models/user');

const crearUsuario = async ( req, res = response ) => {

    const { nombre, password, rut } = req.body;
    
    const user = new User( { nombre, password, rut } );

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    const token = await generateJWT( user.id );
    
    res.json({
        ok: true,
        user,
        token
    });

}


module.exports = {
    crearUsuario
}