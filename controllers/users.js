const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {
    const { nombre = 'none', apiKey , page=1, limit=10} = req.query
    res.json({
        msg: 'Get API - CONTROLADOR',
        nombre,
        apiKey,
        page,
        limit
    })
}

const usuariosPost = (req, res = response) => {
    res.json({
        msg: 'POST API - CONTROLADOR',
        body: req.body
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API - CONTROLADOR'
    })
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id
    res.json({
        msg: 'PUT API - CONTROLADOR',
        id
    })
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