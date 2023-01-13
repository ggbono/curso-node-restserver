const { response } = require("express");
const { Producto } = require("../models");

// getCAtegories - paginado - total - populate
// obtener categoria - populate {}
// actualizar categoria 
//borrar categoria - cambiar estado a false

const createProduct = async (req, res = response) => {
    const { estado, usuario, ...body } = req.body;

    const productoDb = await Producto.findOne({ nombre: body.nombre })

    if (productoDb) {
        return res.status(400).json({
            msg: `El producto ${nombre} ya existe`
        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data)
    await producto.save()
    res.status(201).json(producto)

}

const getProductById = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.json({
        producto
    })
}

const getProducts = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    const [productos, total] = await Promise.all([
        Producto.find(query).populate('usuario', 'nombre').populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite)),
        Producto.countDocuments(query)])

    res.json({
        total,
        productos
    })
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
    res.json({ producto })
}

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    res.json({ producto })
}


module.exports = {
    createProduct,
    getProductById,
    getProducts,
    deleteProduct,
    updateProduct
}