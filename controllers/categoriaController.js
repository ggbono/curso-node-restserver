const { response } = require("express");
const { Categoria } = require("../models");

// getCAtegories - paginado - total - populate
// obtener categoria - populate {}
// actualizar categoria 
//borrar categoria - cambiar estado a false

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categoria.findOne({ nombre })

    if (categoriaDb) {
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)
    await categoria.save()
    res.status(201).json(categoria)

}

const getCategoryById = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
    res.json({
        categoria
    })
}

const getCategories = async (req, res = response) => {
    const { limite = 2, desde = 0 } = req.query;
    const query = { estado: true }
    const [categorias, total] = await Promise.all([
        Categoria.find(query).populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite)),
        Categoria.countDocuments(query)])

    res.json({
        total,
        categorias
    })
}

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }).populate('usuario', 'nombre')
    res.json({
        categoria
    })

}

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const [total, categoriaDb] = await Promise.all([Categoria.countDocuments({ estado: true }), Categoria.findOne({ nombre: data.nombre })])
    if (categoriaDb) {
        return res.status(400).json({
            msg: `La categoria ${data.nombre} ya existe registrada`
        })
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data).populate('usuario', 'nombre')
    res.json({
        categoria
    })
}


module.exports = {
    crearCategoria,
    getCategoryById,
    getCategories,
    deleteCategory,
    updateCategory
}