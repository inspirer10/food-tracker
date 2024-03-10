const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemScheme = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        cathegory: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        expirationDate: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', itemScheme);
