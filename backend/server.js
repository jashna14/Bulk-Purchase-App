const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Product = require('./models/product');
let Order = require('./models/order');

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

// Adding an order
userRoutes.route('/add_order').post(function(req, res) {
    let order = new Order(req.body);
    order.save()
        .then(user => {
            res.status(200).json({'Order': 'Order added successfully'});
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
    Product.updateOne({_id:`${req.body.id}`}, {status: '2'},function(err,product){
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            return res.json(product);
        }

    });
});


// Dispatch an Order
userRoutes.route('/dispatch_order').post(function(req, res) {
    Order.updateMany({product:`${req.body.id}`}, {status: '2'},function(err,product){
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            return res.json(product);
        }

    });
});

// Update Order
userRoutes.route('/update_order').post(function(req, res) {
    Order.updateMany({product:`${req.body.id}`}, {status: `${req.body.status}`, quantity_rem: `${req.body.quantity_rem}`},function(err,product){
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            return res.json(product);
        }
    });
});

// Edit Order
userRoutes.route('/edit_order').post(function(req, res) {
    Order.updateOne({_id:`${req.body.id}`}, {status: `${req.body.status}`, quantity_rem: `${req.body.quantity_rem}`, quantity: `${req.body.quantity}`},function(err,product){
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            return res.json(product);
        }
    });
});

// Update Order status
userRoutes.route('/update_order_status').post(function(req, res) {
    Order.updateMany({product:`${req.body.id}`}, {status: `${req.body.status}`},function(err,product){
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            return res.json(product);
        }
    });
});

// Update Order Rnr
userRoutes.route('/add_rnr').post(function(req, res) {
    Order.updateOne({_id:`${req.body.id}`}, {rating: `${req.body.rating}` , review: `${req.body.review}`},function(err,product){
        if(err) {
            console.log(err);
        } else {
            console.log(res);
            return res.json(product);
        }
    });
});

// Order a product
userRoutes.route('/update_product').post(function(req, res) {
    Product.updateOne({_id:`${req.body.id}`}, {status: `${req.body.status}`, quantity: `${req.body.quantity}`},function(err,product){
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

//finding search products
userRoutes.route('/search_product').post(function(req, res) {
    Product.find({name: `${req.body.name}`,status: `${req.body.status}`}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

//finding product quantity
userRoutes.route('/product_quantity').post(function(req, res) {
    Product.find({_id: `${req.body.id}`}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

// finding dispatch orders
userRoutes.route('/order_dispatch').post(function(req, res) {
    Order.find({vendor: `${req.body.vendor}`,status: `${req.body.status}`}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

// Getting all the products
userRoutes.route('/all_product').post(function(req, res) {
    Product.find({vendor: `${req.body.vendor}`,status: `${req.body.status}`}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});


// Getting all the orders
userRoutes.route('/all_order').post(function(req, res) {
    Order.find({customer: `${req.body.customer}`}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});


// Getting all the orders rnr
userRoutes.route('/get_rnr').post(function(req, res) {
    Order.find({vendor: `${req.body.vendor}`}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

// Getting confirmed the orders
userRoutes.route('/confirmed_order').post(function(req, res) {
    Order.find({customer: `${req.body.customer}`,status: `${req.body.status}`}, function (err, product) {
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
