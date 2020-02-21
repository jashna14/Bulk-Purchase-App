const mongoose = require('mongoose');

let User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true        
    },
    rating: {
    	type: Number
    },
    cnt: {
    	type: Number
    }

});

User.index({username: 1, user_type: 1 }, { unique: true });
module.exports = mongoose.model('User', User,'user');