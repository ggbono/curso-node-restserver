const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

const esEmailValido = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya se encuentra registrado`)
    }
}

const existUserById = async (id = '') => {
    const user = await Usuario.findById(id)
    if (!user) {
        throw new Error(`El usuario con id ${id} no existe`)
    }
}

const existeCategoria = async (id = '') => {
    const categoria = await Categoria.findById(id)
    if (!categoria) {
        throw new Error(`La categoria con id ${id} no existe`)
    }
}

const existeProducto = async (id = '') => {
    const producto = await Producto.findById(id)
    if (!producto) {
        throw new Error(`La categoria con id ${id} no existe`)
    }
}


module.exports = {
    esRoleValido,
    esEmailValido,
    existUserById,
    existeCategoria,
    existeProducto
} 