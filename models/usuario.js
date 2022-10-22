
const { Schema, model } = require('mongoose');


const UserSchema = Schema({
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    img: {
        type: String
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        default:'USER_ROLE',
        enum: ['ADMIN_ROLE', 'SUPER_ROLE', 'VENTAS_ROLE', 'USER_ROLE']
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject()
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UserSchema);