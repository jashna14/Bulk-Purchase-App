const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Adding a new product
userRoutes.route('/add_product').post(function(req, res) {

    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Delete a product
userRoutes.route('/delete_product').post(function(req, res) {
    Product.findByIdAndRemove(req.body.id,function(err, product) {
        if(err) {
            console.log(err);
        } else {
            console.log(product);
            res.json(product);
        }
    })
});

// Dispatch a product
userRoutes.route('/dispatch_product').post(function(req, res) {
    console.log(req.body)
    Product.updateOne({_id:`${req.body.id}`}, {status: '2'},function(err,product){
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            return res.json(product);
        }

    });
});

//finding ready to dispatch products
userRoutes.route('/product_ready').post(function(req, res) {
    Product.find({vendor: `${req.body.vendor}`,status: `${req.body.status}`}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

// Getting all the products
userRoutes.route('/list/:id').get(function(req, res) {
    id = req.params.id
    id = id.substring(1);
    Product.find({vendor: `${id}`}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

//login
userRoutes.route('/login').post(function (req, res) {
    let user = req.body;
    User.find({username: `${user.username}`,password:`${user.password}`,user_type:`${user.user_type}`}, function (err, user) {
        return res.json(user);
    });

});


// Getting a user by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
