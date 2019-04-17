import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NavBar from '../src/components/commons/navbar';
import PageNotFound from '../src/components/commons/page-not-found';
import LoginForm from './components/loginForm';
import RegistrationForm from './components/registrationForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>

        <NavBar />
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={RegistrationForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
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
