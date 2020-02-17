const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
    	type: Number
    },
    vendor: {
    	type: String
    },
    status: {
    	type: Number
    }


});

module.exports = mongoose.model('Product',Product,'product');