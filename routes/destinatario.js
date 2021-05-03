const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { crearDestinatario, verDestinatarios, verDestinatarioPorID } = require('../controllers/destinatario');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/', validateJWT, verDestinatarios );

router.post( '/', [
    validateJWT,
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'correo', 'El correo no es valido' ).isEmail(),
    check( 'rut', 'El rut es obligatorio' ).not().isEmpty(),
    check( 'telefono', 'El telefono es obligatorio' ).not().isEmpty(),
    check( 'banco', 'El banco es obligatorio' ).not().isEmpty(),
    check( 'cuenta', 'La cuenta es obligatoria' ).not().isEmpty(),
    check( 'cuenta', 'La cuenta no es valida' ).isIn( ['Cuenta Corriente', 'Cuenta Vista', 'Cuenta Ahorro', 'Cuenta RUT'] ),
    check( 'numeroCuenta', 'El numero de cuenta es obligatorio' ).not().isEmpty(),
    validateFields
], crearDestinatario );

router.get( '/:id',[ 
    check( 'id' , 'No es un id valido' ).isMongoId(),
    validateFields
], verDestinatarioPorID );

module.exports = router;