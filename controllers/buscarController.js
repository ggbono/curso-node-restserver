const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const collecionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles']

const buscarUsuario = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const usuario = await Usuario.findById(termino)
        res.json({
            results: usuario ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    })
    res.json({
        results: usuarios
    })
}

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const categoria = await Categoria.findById(termino)
        res.json({
            results: categoria ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find(
        { nombre: regex, estado: true })
    res.json({
        results: categorias
    })
}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre')
        res.json({
            results: producto ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find(
        { nombre: regex, estado: true }).populate('categoria', 'nombre')

    res.json({
        results: productos
    })
}


const buscar = (req, resp = response) => {
    const { collection, term } = req.params;
    if (!collecionesPermitidas.includes(collection)) {
        return resp.status(400).json({
            msg: `Las collecciones permitidas son ${collecionesPermitidas}`
        })
    }
    switch (collection) {
        case 'usuarios':
            buscarUsuario(term, resp)
            break;

        case 'categorias':
            buscarCategorias(term, resp)
            break;

        case 'productos':
            buscarProductos(term, resp)
            break;

        default:
            resp.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
            break;
    }
}

module.exports = {
    buscar
}