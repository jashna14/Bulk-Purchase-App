import React, {Component} from 'react';
import axios from 'axios';

export default class Customer extends Component {
    
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         username: '',
    //         password: '',
    //         user_type: "customer"
    //     }

    //     this.onChangeUsername = this.onChangeUsername.bind(this);
    //     this.onChangePassword = this.onChangePassword.bind(this);
    //     this.onChangeUser_type = this.onChangeUser_type.bind(this);
    //     this.onSubmit = this.onSubmit.bind(this);
    // }
    
    // onChangeUsername(event) {
    //     this.setState({ username: event.target.value });
    // }

    // onChangePassword(event) {
    //     this.setState({ password: event.target.value });
    // }

    // onChangeUser_type(event) {
    //     this.setState({ user_type: event.target.value });
    // }

    // onSubmit(e) {
    //     e.preventDefault();

    //     const newUser = {
    //         username: this.state.username,
    //         password: this.state.password,
    //         user_type: this.state.user_type
    //     }

    //     axios.post('http://localhost:4000/login', newUser)
    //         .then(res => {
    //             if(Object.entries(res.data).length === 1) {
    //                 if (res.data[0].username === newUser.username) {
    //                     console.log('Hiiiiiii')
    //                     this.props.history.push({
    //                         pathname: '/register'
    //                     })
    //                 }
    //             }
    //             else {
    //                 alert("User not found")
    //             }    
    //         });

    //     this.setState({
    //         username: '',
    //         password: '',
    //         user_type: ''
    //     });
    // }

    render() {
        return (
            <h1> Hello Customer </h1>
           
        )
    }
}