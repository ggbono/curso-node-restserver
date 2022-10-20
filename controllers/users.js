const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    const { limite = 2, desde = 0 } = req.query
    const query = { estado: true }
    /*  const usuarios = await Usuario.find(query)
         .skip(Number(desde))
         .limit(Number(limite))
 
     const total = await Usuario.countDocuments(); */

    const [usuarios, total] = await Promise.all([
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
        Usuario.countDocuments(query)])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    const salt = bcryptjs.genSaltSync();

    const usuario = new Usuario({ nombre, correo, password, rol })
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save();

    res.json({
        msg: 'POST API - CONTROLADOR',
        usuario
    })
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    res.json({
        usuario
    })
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'PAtch API - CONTROLADOR'
    })
}

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPatch,
    usuariosPut
}