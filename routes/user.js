const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { mailExists, rutExists } = require('../helpers/db-validators');

const { crearUsuario } = require('../controllers/user');

const router = Router();

router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password es obligatorio' ).not().isEmpty(),
    check( 'rut', 'El rut es obligatorio' ).not().isEmpty(),
    check( 'rut' ).custom( rutExists ),
    validateFields
], crearUsuario );

module.exports = router;