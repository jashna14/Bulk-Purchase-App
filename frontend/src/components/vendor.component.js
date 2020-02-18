import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
/* eslint-disable */ 

export default class Vendor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            quantity: '',
            status: '0',
            vendor: this.props.location.vendor,
            rendor: '0',
            products: [],
            ready_products: []
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
    }

    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }

    onChangeQuantity(event) {
        this.setState({ quantity: event.target.value });
    }

    addProduct = (e) => {
        this.setState({rendor : '1'});
        return this.render()
    }

    allProduct = (e) => {
        axios.get(`http://localhost:4000/list/:${this.state.vendor}`)
             .then(response => {
                this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        this.setState({rendor : '2'});

    }

    Productready = (e) => {
        const newProduct = {
            vendor: this.state.vendor,
            status: '1'
            }

        axios.post('http://localhost:4000/product_ready', newProduct)
            .then(response => {
                this.setState({ready_products: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
        this.setState({rendor : '3'});

    }

    Delete = (e,Pid) => {
        const pid = {
            id: Pid
        }
        axios.post('http://localhost:4000/delete_product', pid)
        .then(response => {
            axios.get(`http://localhost:4000/list/:${this.state.vendor}`)
            .then(response => {
                this.setState({products: response.data});
            })
            .catch(function(error) {
                 console.log(error);
            })            
        })
    }

    Dispatch = (e,Pid) => {
        console.log(Pid)

        const pid = {
            id: Pid
        }
        console.log("lalalalallala22222222")
        axios.post('http://localhost:4000/dispatch_product', pid)
        .then(response => {
            console.log("lalalalallala")
            const newProduct = {
            vendor: this.state.vendor,
            status: '1'
            }
            axios.post('http://localhost:4000/product_ready', newProduct)
            .then(response => {
                console.log('yeyeyyeyeyeye')
                this.setState({ready_products: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
        })
    }

    Logout = (e) => {
        this.props.history.push({
            pathname: '/login',
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            name: this.state.name,
            price: this.state.price,
            quantity: parseInt(this.state.quantity),
            vendor: this.state.vendor,
            status: this.state.status
        }

        axios.post('http://localhost:4000/add_product', newProduct)
            

        this.setState({
            name: '',
            price: '',
            quantity: ''
        });
    }

    render() {
        if (this.state.rendor ==='0') {
            return this.render1();
        }

        else if (this.state.rendor === '1') {
            return this.render2();
        }

        else if (this.state.rendor === '2') {
            return this.render3();
        }

        else if (this.state.rendor === '3') {
            return this.render4();
        }

    }

    render1() {
        return (
            <div className="container">
                <div class="topnav">
                    <a onClick = {e => this.addProduct(e)} href="#" >Add Product</a>
                    <a onClick = {e => this.allProduct(e)} href="#" >All Products</a>
                    <a onClick = {e => this.Productready(e)} href="#" >Product ready to dispatch</a>
                    <a onClick = {e => this.Productdispatch(e)} href="#" >Dispatched product</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                </div> 
            </div>   
        )
    }

    render2() {
        return (
            <div className="container">
                    <div class="topnav">
                    <a onClick = {e => this.addProduct(e)} class="active" href="#" >Add Product</a>
                    <a onClick = {e => this.allProduct(e)} href="#" >All Products</a>
                    <a onClick = {e => this.Productready(e)} href="#" >Product ready to dispatch</a>
                    <a onClick = {e => this.Productdispatch(e)} href="#" >Dispatched product</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                    </div> 
                <div>  
                    <form onSubmit= {e => this.onSubmit(e)}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" 
                                   className="form-control" 
                                   value={this.state.name}
                                   onChange={this.onChangeName}
                                   />
                        </div>
                        <div className="form-group">
                            <label>Price: </label>
                            <input type="text" 
                                   className="form-control" 
                                   value={this.state.price}
                                   onChange={this.onChangePrice}
                                   />  
                        </div>
                        <div className="form-group">
                            <label>Quantity: </label>
                            <input type="text" 
                                   className="form-control" 
                                   value={this.state.quantity}
                                   onChange={this.onChangeQuantity}
                                   />  
                        </div>                    
                        <div className="form-group">
                            <input type="submit" value="addProduct" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>       
        )
    }


    render3() {
        return (
            <div className="container">
                    <div class="topnav">
                    <a onClick = {e => this.addProduct(e)} href="#" >Add Product</a>
                    <a onClick = {e => this.allProduct(e)} class="active" href="#" >All Products</a>
                    <a onClick = {e => this.Productready(e)} href="#" >Product ready to dispatch</a>
                    <a onClick = {e => this.Productdispatch(e)} href="#" >Dispatched product</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                    </div> 
                <div>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.name}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td> <button onClick = {e => this.Delete(e,currentProduct._id)}> Delete </button> </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                </div>
            </div>       
        )
    }

    render4() {
        return (
            <div className="container">
                    <div class="topnav">
                    <a onClick = {e => this.addProduct(e)} href="#" >Add Product</a>
                    <a onClick = {e => this.allProduct(e)} href="#" >All Products</a>
                    <a onClick = {e => this.Productready(e)} class="active" href="#" >Product ready to dispatch</a>
                    <a onClick = {e => this.Productdispatch(e)} href="#" >Dispatched product</a>
                    <a onClick = {e => this.Logout(e)}  href="#" >Logout</a>
                    </div> 
                <div>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Dispatch</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.ready_products.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.name}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td> <button onClick = {e => this.Dispatch(e,currentProduct._id)}> Dispatch </button> </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                </div>
            </div>       
        )
    }


}
