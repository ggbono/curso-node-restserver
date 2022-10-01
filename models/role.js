const { Schema, model } = require('mongoose')

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El role no es valido']
    }

})

module.exports = model('Role', RoleSchema)