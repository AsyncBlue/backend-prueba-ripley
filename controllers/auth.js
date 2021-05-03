const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async ( req, res = response) => {

    const { rut, password } = req.body;

    try {

        const user = await User.findOne( { rut } );

        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - RUT'
            });
        }

        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - PASSWORD'
            });
        }

        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal hable con el Administrador'
        });
    }

}

const renovarToken = async ( req, res = response ) => {

    const { user } = req;

    const token = await generateJWT( user.id );

    res.json({
        ok: true,
        user,
        token
    });

}


module.exports = {
    login,
    renovarToken
}