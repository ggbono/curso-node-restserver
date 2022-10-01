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
        throw new Error (`El email ${correo} ya se encuentra registrado`)
    }
}

const existUserById= async(id='')=>{
    const user= await Usuario.findById(id)
    if (!user) {
        throw new Error (`El usuario con id ${id} no existe`)
    }
}


module.exports = {
    esRoleValido,
    esEmailValido,
    existUserById
} 