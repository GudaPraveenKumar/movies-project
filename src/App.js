import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import Rentals from './components/rentals';
import Customers from './components/customers';
import NavBar from '../src/components/commons/navbar';
import PageNotFound from '../src/components/commons/page-not-found';
import { Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>

        <NavBar />
        <main role="main" className="container">
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/page-not-found" component ={PageNotFound}/>
          <Route path="/" exact component={Movies}/>
          <Redirect to="/page-not-found"/>
        </Switch>
        </main>
      </div>
    );
  }
}

export default App;
