const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProductById, getProducts, deleteProduct, updateProduct } = require('../controllers/productosController');
const { existeProducto, existeCategoria } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares')

const router = Router();

//  Obtener todas las categorias- publico
router.get('/', getProducts)

// obtener una categoria por id - publica - 
router.get('/:id',
    [
        check('id', 'No es un id de mongo valido').isMongoId(),
        check('id').custom(existeProducto),
        validarCampos
    ], getProductById)

// crear producto - privado usuarios con token y cualquier role
router.post('/', [
    validarJWT,
    check('categoria', 'No es un id de mongo valido').isMongoId(),
    check('categoria').custom(existeCategoria),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createProduct)

// Actualiza- privado usuarios con token validos
router.put('/:id', [
    validarJWT,
    check('categoria', 'No es un id de categoria de mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], updateProduct)

// delete - solo borran admins
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos], deleteProduct)

module.exports = router;