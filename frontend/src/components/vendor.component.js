import React, {Component} from 'react';
import axios from 'axios';

export default class Vendor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            quantity: '',
            vendor: this.props.location.vendor,
            rendor: '0',
            products: []
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
    }

    // allProduct(event) {
    //     axios.get(`http://localhost:4000/list/:${this.state.vendor}`)
    //          .then(response => {
    //             this.setState({products: response.data});
    //          })
    //          .catch(function(error) {
    //              console.log(error);
    //          })
    //     this.setState({rendor : '2'});

    // }

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
            quantity: this.state.quantity,
            vendor: this.state.vendor
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

    }

    render1() {
        return (
            <div>
                <button onClick = {e => this.addProduct(e)}>Add Product</button>
                <button onClick = {e => this.allProduct(e)}>All Products</button>
                <button >Product ready to dispatch</button>
                <button >Dispatched product</button>
                <button onClick = {e => this.Logout(e)}>Logout</button>
            </div>   
        )
    }

    render2() {
        return (
            <div>
                <div>
                    <button onClick = {e => this.addProduct(e)}>Add Product</button>
                    <button onClick = {e => this.allProduct(e)}>All Products</button>
                    <button >Product ready to dispatch</button>
                    <button >Dispatched product</button>
                    <button onClick = {e => this.Logout(e)}>Logout</button>
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
            <div>
                <div>
                    <button onClick = {e => this.addProduct(e)}>Add Product</button>
                    <button onClick = {e => this.allProduct(e)}>All Products</button>
                    <button >Product ready to dispatch</button>
                    <button >Dispatched product</button>
                    <button onClick = {e => this.Logout(e)}>Logout</button>
                </div>    
                <div>
                    <h1>hello</h1>  
                </div>
                <div>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
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