import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NavBar from '../src/components/commons/navbar';
import PageNotFound from '../src/components/commons/page-not-found';
import LoginForm from './components/loginForm';
import RegistrationForm from './components/registrationForm';
import Logout from './components/logout';
import ProtectedRoute from './components/commons/protectedRoute';
import auth from './services/authService';


import './App.css';
import "react-toastify/dist/ReactToastify.css";

class App extends Component {

  state = {}

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user })
  }

  render() {
    const {user} = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={RegistrationForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
           
           {/** Protected route advanced */}
            <ProtectedRoute
              path="/movies/:id"
              component = {MovieForm}
            />

            {/* Protected route basic
             <Route
              path="/movies/:id"
              render = {props =>{
                if(!user) return <Redirect to="/login" />;
                return <MovieForm {...props}/>
              }}
            /> */}

            <Route 
              path="/movies" 
              render= {props => <Movies {...props} user={user}/>} 
            />

            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/page-not-found" component={PageNotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/page-not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
