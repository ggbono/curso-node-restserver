const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/users');
const { esRoleValido, esEmailValido, existUserById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet)
router.put('/:id', [
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)
router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password es obligatorio y mas de 6 caracteres').isLength({ min: 6 }),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('rol').custom(esRoleValido),
    check('correo').custom(esEmailValido)
    //check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
], validarCampos, usuariosPost)
router.delete('/:id', [
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom(existUserById),
    validarCampos
], usuariosDelete)
router.patch('/', usuariosPatch)

module.exports = router;