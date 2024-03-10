const Product = require('../models/Product.js');
const mongoose = require('mongoose');

//GET -ALL- products
const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
};

//GET a single product
const getProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' });
    }
    const products = await Product.findById(id);

    if (!products) {
        return res.status(404).json({ error: 'No such product' });
    }
    res.status(200).json(products);
};

//POST a new product
const addProduct = async (req, res) => {
    const { name, cathegory, id, expirationDate } = req.body;
    try {
        const newProduct = await Product.create({
            name,
            cathegory,
            id,
            expirationDate,
        });
        res.status(200).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//DELETE a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ error: 'No such product - ID of object was invalid' });
    }

    const products = await Product.findOneAndDelete({ _id: id });

    if (!products) {
        return res.status(404).json({ error: 'No such product' });
    }

    res.status(200).json(products);
};

//UPDATE a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such product' });
    }

    const products = await Product.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!products) {
        return res.status(404).json({ error: 'No such product' });
    }
    res.status(200).json(products);
};

module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
};
