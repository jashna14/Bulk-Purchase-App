import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import Login from './components/login.component'
import Register from './components/register.component'
import Vendor from './components/vendor.component'
import Customer from './components/customer.component'


function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/login" component={Login}/>
        <Route path="/vendor/:vendor" component={Vendor}/>
        <Route path="/register" component={Register}/>
        <Route path="/customer/:customer" component={Customer}/>
      </div>
    </Router>
  );
}

export default App;
