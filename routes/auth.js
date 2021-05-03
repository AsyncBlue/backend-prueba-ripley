const { Router } = require('express');
const { check } = require('express-validator');
const { login, renovarToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post( '/login', [
    check( 'rut', 'El rut es obligatorio' ).not().isEmpty(),
    check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
    validateFields
], login );


router.get( '/', validateJWT, renovarToken );


module.exports = router;