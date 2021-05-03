const { Router } = require('express');
const { check } = require('express-validator');
const { crearTransferencia, verTransferencias } = require('../controllers/transferencia');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.get( '/', validateJWT, verTransferencias );

router.post( '/', [
    validateJWT,
    check( 'destinatario', 'El destinatario es obligatorio' ).not().isEmpty(),
    check( 'monto', 'El monto es obligatorio y tiene que ser mayor que 0' ).isNumeric(),
    validateFields
], crearTransferencia );

module.exports = router;