const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
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

Product.index({vendor: 1, name: 1 }, { unique: true });
module.exports = mongoose.model('Product',Product,'product');