const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    product_name: {
        type: String
    },
    product: {
    	type: String
    },
    price: {
        type: Number
    },
    quantity: {
    	type: Number
    },
    vendor_name: {
    	type: String
    },
    vendor: {
    	type: String
    }, 
    status: {
    	type: Number
    },
    customer_name: {
    	type: String
    },
    customer: {
    	type:String
    },
    rating: {
    	type: Number
    },
    review: {
    	type: String
    }

});

module.exports = mongoose.model('Order',Order,'order');