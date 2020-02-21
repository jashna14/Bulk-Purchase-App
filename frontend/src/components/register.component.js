import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import './jh.css'
/* eslint-disable */

export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            user_type: 'customer',
            rating: 0,
            cnt: 0
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
            user_type: this.state.user_type,
            rating: parseInt(0),
            cnt: parseInt(0)
        }
        axios.post('http://localhost:4000/add', newUser)
        .then(response => {
         })
         .catch(function(error) {
            alert("The { username,user_type } combination already exists OR Some fielda are empty")
         })

        this.setState({
            username: '',
            password: '',
            user_type: 'customer'
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
                        <a onClick = {e => this.Togglelogin(e)} href="/login">Login</a>
                        <a onClick = {e => this.Toggleregister(e)} class="active" href="/register">Register</a>
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
                            <input type="submit" value="Sign up" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
        )
    }
}