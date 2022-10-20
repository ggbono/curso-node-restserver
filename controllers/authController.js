const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwtGenerator');


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario /  password no son correctos - correo'
            })
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado: false'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario /  password no son correctos - password'
            })
        }

        const token = await generateJWT(usuario.id)

        res.json({
            usuario,
            token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Ups, algo salio mal'
        })
    }

}

module.exports = {
    login
}