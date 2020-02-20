import React, {Component} from 'react';
import axios from 'axios';

export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
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
                    <a onClick = {e => this.Toggleapp(e)} class="active" href="/">App</a>
                    <a onClick = {e => this.Togglelogin(e)} href="/login">Login</a>
                    <a onClick = {e => this.Toggleregister(e)}  href="/register">Register</a>
                </div>    
                <table className="table table-striped">
                    <thead>
                        <tr align = "center">
                            <th>Username</th>
                            <th>Password</th>
                            <th>User_type</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.users.map((currentUser, i) => {
                            return (
                                <tr align = "center">
                                    <td>{currentUser.username}</td>
                                    <td>{currentUser.password}</td>
                                    <td>{currentUser.user_type}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}