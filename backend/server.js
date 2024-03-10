const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} = require('./controllers/Controller');
const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                `CONNECTED TO DB & WORKING on port - ${process.env.PORT}`
            );
        });
    })
    .catch(console.error);

//GET -ALL- products
app.get('/', getAllProducts);

//GET single product
app.get('/:id', getProduct);

// post a new product
app.post('/', addProduct);

//EDIT single product
app.patch('/:id', updateProduct);

//DELETE single product
app.delete('/:id', deleteProduct);

/*
app.get('/api', (req, res) => {
    res.json({
        items: [
            { productName: 'Banana' },
            { productName: 'Bread' },
            { productName: 'Apple juice' },
        ],
    });
});*/
