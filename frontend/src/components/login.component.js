import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './jh.css'

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            user_type: "vendor"
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUser_type = this.onChangeUser_type.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeUser_type(event) {
        this.setState({ user_type: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            user_type: this.state.user_type
        }

        axios.post('http://localhost:4000/login', newUser)
            .then(res => {
                if(Object.entries(res.data).length === 1) {
                    if (res.data[0].username === newUser.username) {
                        if(res.data[0].user_type === "vendor") { 
                            this.props.history.push({
                                pathname: '/vendor/:vendor_id',
                                vendor: res.data[0]._id
                            })
                        }    
                        else if(res.data[0].user_type === "customer") {
                            this.props.history.push({
                                pathname: 'customer/:customer_id',
                                customer: res.data[0]._id
                            })
                        }
                    }
                }
                else {
                    alert("User not found")
                }    
            });

        this.setState({
            username: '',
            password: '',
            user_type: ''
        });
    }


    Toggleapp = (e) => {
        this.props.history.push({
            pathname: '/',
        });
    };


    Togglelogin = (e) => {
        this.props.history.push({
            pathname: '/login',
        });
    };


    Toggleregister = (e) => {
        this.props.history.push({
            pathname: '/register',
        });
    };

    render() {
        return (
            <div className="container">
                <div class="topnav">
                    <a onClick = {e => this.Toggleapp(e)} href="/">App</a>
                    <a onClick = {e => this.Togglelogin(e)} class="active" href="/login">Login</a>
                    <a onClick = {e => this.Toggleregister(e)} href="/register">Register</a>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <label>User type: </label>
                        <select className="form-control" value={this.state.user_type} onChange={this.onChangeUser_type}>
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                        </select>    
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}