const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, getCategoryById, getCategories, deleteCategory, updateCategory } = require('../controllers/categoriaController');
const { existeCategoria } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares')

const router = Router();

//  Obtener todas las categorias- publico
router.get('/', getCategories)

// obtener una categoria por id - publica - 
router.get('/:id',
    [
        check('id', 'No es un id de mongo valido').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos
    ], getCategoryById)

// crear categoria - privado usuarios con token y cualquier role
router.post('/', [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

// Actualiza- privado usuarios con token validos
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], updateCategory)

// delete - solo borran admins
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos], deleteCategory)

module.exports = router;