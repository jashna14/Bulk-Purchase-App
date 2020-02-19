import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
/* eslint-disable */ 

export default class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            product: '',
            price: 0,
            quantity: 0,
            vendor_name: '',
            vendor: '',
            status: '0',
            customer_name: this.props.location.customer_name,
            customer: this.props.location.customer,
            rating: 0,
            review: '',
            rendor: '0',
            search: '',
            o_quantity: '',
            search_result: [],
            current_pid: [],
            allorders: [],
            conforders: [],
            pid: [],
            rnr: [],
            sort: 'price' 
        }

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.onChangeo_quantity = this.onChangeo_quantity.bind(this);
    }

    onChangeSearch(event) {
        this.setState({ search: event.target.value });
    }

    onChangeSort(event) {
        this.setState({ sort: event.target.value });
    }

    onChangeRating(event) {
        this.setState({ rating: event.target.value });
    }

    onChangeReview(event) {
        this.setState({ review: event.target.value });
    } 

    onChangeo_quantity(event) {
        this.setState({ o_quantity: event.target.value });
    }

    searchproduct = (e) => {
        this.setState({rendor : '1'});
        return this.render()
    }

    find_status = function(x){
        if (parseInt(x) === 0){
            return 'Waiting'
        }
        else if (parseInt(x) === 1){
            return 'Placed'
        }
        else if (parseInt(x) === 2){
            return 'Dispatched'
        }
        else if (parseInt(x) === 4){
            return 'Cancelled'
        }
    }

    Logout = (e) => {
        this.props.history.push({
            pathname: '/login',
        });
    };

    Rnr = (e,Pid) => {
        this.state.pid = Pid
        this.setState({rendor : '6'}); 
    };

    Rnr1 = (e) => {
        const newProduct = {
            id: this.state.pid,
            rating: this.state.rating,
            review: this.state.review
        }

        axios.post('http://localhost:4000/add_rnr', newProduct)
        alert('review and rating added successfully')    

        this.setState({
            id: '',
            rating: 0,
            review: ''
        });

        this.setState({rendor : '5'}); 

    };

    onSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            name: this.state.search,
            status: '0'
        }

        axios.post('http://localhost:4000/search_product', newProduct)
            .then(response => {
                if (this.state.sort === 'price') {
                    this.setState({search_result: response.data.sort((a,b) => a.price - b.price)});
                }
                else if (this.state.sort === 'quantity') {
                    this.setState({search_result: response.data.sort((a,b) => a.quantity - b.quantity)})
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        
        this.setState({
            search: '',
        });

        this.setState({rendor : '2'}); 
    }

    Order = (e,Pid) => {
        this.state.current_pid = Pid
        this.setState({rendor : '3'});
       
    }

    back = (e) => {
        this.setState({rendor : '2'});
    }

    allOrders = (e) => {
        const newProduct = {
            customer: this.state.customer
            }

        axios.post('http://localhost:4000/all_order', newProduct)
             .then(response => {
                this.setState({allorders: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        this.setState({rendor : '4'});

    }

    showrnr = (e,pid) => {
        const newProduct = {
            vendor: pid.vendor
            }

        axios.post('http://localhost:4000/get_rnr', newProduct)
             .then(response => {
                this.setState({rnr: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        this.setState({rendor : '7'});
    }

    Productconfirmed = (e) => {
        const newProduct = {
            customer: this.state.customer,
            status: '2'
            }

        axios.post('http://localhost:4000/confirmed_order', newProduct)
             .then(response => {
                this.setState({conforders: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        this.setState({rendor : '5'});

    }

    Order1 = (e) => {

        if(parseInt(this.state.current_pid.quantity) < parseInt(this.state.o_quantity))
        {
            alert('Ordered Quantity more than Remaining Quantity')
            this.setState({rendor : '1'});
        }
        else
        {   
            const x = (parseInt(this.state.current_pid.quantity) - parseInt(this.state.o_quantity))
            var y = 0
            if (x === 0) {
                y = 1
            }

            // console.log(x,y)

            const data = {
                id: this.state.current_pid._id,
                quantity: x,
                status: y
            }

            // console.log(data)
            axios.post('http://localhost:4000/update_product', data)
            .then(response => {
                const newOrder = {
                    product_name: this.state.current_pid.name,
                    product: this.state.current_pid._id,
                    price: this.state.current_pid.price,
                    quantity: this.state.o_quantity,
                    vendor_name: this.state.current_pid.vendor_name,
                    vendor: this.state.current_pid.vendor,
                    status: y,
                    customer_name: this.state.customer_name,
                    customer: this.state.customer,
                    rating: 0,
                    review: ''
                }
        
                axios.post('http://localhost:4000/add_order', newOrder)
                .then(response => {
                    this.setState({
                        product_name: '',
                        product: '',
                        price: 0,
                        quantity: 0,
                        vendor_name: '',
                        vendor: '',
                        status: '',
                        rating: 0,
                        review: ''
                    });

                    const data1 = {
                        id: this.state.current_pid._id,
                        status: y
                    }
                    axios.post('http://localhost:4000/update_order_status', data1)
                })    
            })

            alert('Ordered Successfully')
            this.setState({rendor : '1'});
        }    

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

        else if (this.state.rendor === '4') {
            return this.render5();
        }
        else if (this.state.rendor === '5') {
            return this.render6();
        }
        else if (this.state.rendor === '6') {
            return this.render7();
        }
        else if (this.state.rendor === '7') {
            return this.render8();
        }

    }

    render1() {
        return (
            <div className="container">
                <div class="topnav">
                    <a onClick = {e => this.searchproduct(e)} href="#" >Search Product</a>
                    <a onClick = {e => this.allOrders(e)} href="#" >Orders Status</a>
                    <a onClick = {e => this.Productconfirmed(e)} href="#" >Confirmed Orders</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                </div> 
            </div>   
        )
    }

    render2() {
        return (
            <div className="container">
                <div class="topnav">
                    <a onClick = {e => this.searchproduct(e)} href="#" class="active">Search Product</a>
                    <a onClick = {e => this.allOrders(e)} href="#" >Orders Status</a>
                    <a onClick = {e => this.Productconfirmed(e)} href="#" >Confirmed Orders</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                </div>
                <div>  
                    <form onSubmit= {e => this.onSubmit(e)}>
                        <div className="form-group">
                            <label>Product: </label>
                            <input type="text" 
                                   className="form-control" 
                                   value={this.state.search}
                                   onChange={this.onChangeSearch}
                                   />
                        </div> 
                        <div className="form-group">
                            <label>Sort By: </label>
                            <select className="form-control" value={this.state.sort} onChange={this.onChangeSort}>
                                <option value="price">Price</option>
                                <option value="quantity">Quantity</option>
                            </select>    
                        </div>          
                        <div className="form-group">
                            <input type="submit" value="Search" className="btn btn-primary"/>
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
                    <a onClick = {e => this.searchproduct(e)} href="#" class="active">Search Product</a>
                    <a onClick = {e => this.allOrders(e)} href="#" >Orders Status</a>
                    <a onClick = {e => this.Productconfirmed(e)} href="#" >Confirmed Orders</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                </div>
                <div>  
                    <form onSubmit= {e => this.onSubmit(e)}>
                        <div className="form-group">
                            <label>Product: </label>
                            <input type="text" 
                                   className="form-control" 
                                   value={this.state.search}
                                   onChange={this.onChangeSearch}
                                   />
                        </div>
                        <div className="form-group">
                            <label>Sort By: </label>
                            <select className="form-control" value={this.state.sort} onChange={this.onChangeSort}>
                                <option value="price">Price</option>
                                <option value="quantity">Quantity</option>
                            </select>    
                        </div>           
                        <div className="form-group">
                            <input type="submit" value="Search" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>

                <div>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>product Name</th>
                            <th>Price</th>
                            <th>Quantity Remaining</th>
                            <th>Vendor Name</th>
                            <th>Order</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.search_result.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.name}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td onClick = {e => this.showrnr(e,currentProduct)}>{currentProduct.vendor_name}</td>
                                    <td> <button onClick = {e => this.Order(e,currentProduct)}> Order </button> </td>
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
                    <a onClick = {e => this.searchproduct(e)} href="#" class="active">Search Product</a>
                    <a onClick = {e => this.allOrders(e)} href="#" >Orders Status</a>
                    <a onClick = {e => this.Productconfirmed(e)} href="#" >Confirmed Orders</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                </div>
                <div>  
                    <form>
                        <div className="form-group">
                            <label>Quantity: </label>
                            <input type="text" 
                                   className="form-control" 
                                   value={this.state.o_quantity}
                                   onChange={this.onChangeo_quantity}
                                   />
                        </div>           
                        <div className="form-group">
                            <input type="button" value="Order" onClick = {e => this.Order1(e)} className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>   
        )
    }

    render5() {
        return (

            <div className="container">
                <div class="topnav">
                    <a onClick = {e => this.searchproduct(e)} href="#">Search Product</a>
                    <a onClick = {e => this.allOrders(e)} href="#" class="active" >Orders Status</a>
                    <a onClick = {e => this.Productconfirmed(e)} href="#" >Confirmed Orders</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                </div>
                <div>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>product Name</th>
                            <th>Quantity Remaining</th>
                            <th>Vendor Name</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.allorders.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.product_name}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td>{currentProduct.vendor_name}</td>
                                    <td>{this.find_status(currentProduct.status)}</td>
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

    render6() {
        return (

            <div className="container">
                <div class="topnav">
                    <a onClick = {e => this.searchproduct(e)} href="#">Search Product</a>
                    <a onClick = {e => this.allOrders(e)} href="#" >Orders Status</a>
                    <a onClick = {e => this.Productconfirmed(e)} href="#"  class="active" >Confirmed Orders</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                </div>
                <div>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>product Name</th>
                            <th>Quantity Remaining</th>
                            <th>Vendor Name</th>
                            <th>Status</th>
                            <th>Add Reviews and Rating</th>

                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.conforders.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.product_name}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td>{currentProduct.vendor_name}</td>
                                    <td>{this.find_status(currentProduct.status)}</td>
                                    <td> <button onClick = {e => this.Rnr(e,currentProduct._id)}> Submit Reviews and Ratings </button> </td>
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

    render7() {
        return (
            <div className="container">
                <div class="topnav">
                    <a onClick = {e => this.searchproduct(e)} href="#">Search Product</a>
                    <a onClick = {e => this.allOrders(e)} href="#" >Orders Status</a>
                    <a onClick = {e => this.Productconfirmed(e)} href="#"  class="active">Confirmed Orders</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                </div>
                <div>  
                    <form>
                        <div className="form-group">
                            <label>Product Rating out of 5: </label>
                            <input type="text" 
                                   className="form-control" 
                                   value={this.state.rating}
                                   onChange={this.onChangeRating}
                                   />
                        </div>
                        <div className="form-group">
                            <label>Product Review</label>
                            <input type="text" 
                                   className="form-control" 
                                   value={this.state.review}
                                   onChange={this.onChangeReview}
                                   />
                        </div>           
                        <div className="form-group">
                            <input type="button" value="Submit" onClick = {e => this.Rnr1(e)} className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>   
        )
    }

    render8() {
        return (

            <div className="container">
                <div class="topnav">
                    <a onClick = {e => this.searchproduct(e)} href="#" class="active">Search Product</a>
                    <a onClick = {e => this.allOrders(e)} href="#" >Orders Status</a>
                    <a onClick = {e => this.Productconfirmed(e)} href="#" >Confirmed Orders</a>
                    <a onClick = {e => this.Logout(e)} href="#" >Logout</a>
                </div>
                <div>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Customer_name</th>
                            <th>Product_name</th>
                            <th>Review</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.rnr.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.customer_name}</td>
                                    <td>{currentProduct.product_name}</td>
                                    <td>{currentProduct.review}</td>
                                    <td>{currentProduct.rating}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                </div>
                <div>
                    <button onClick = {e => this.back(e)}>Back</button>
                </div>
            </div>   
        )
    }


}
