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
    },
    vendor_name: {
    	type: String
    },
    vendor_rating: {
    	type: Number
    }

});

module.exports = mongoose.model('Product',Product,'product');