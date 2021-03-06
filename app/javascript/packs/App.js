import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Users from './components/users/index';
import errorPage from './components/error/error';
import AddUserForm from './components/users/AddUserForm';
import ShowUser from './components/users/ShowUser';
import Facebook from './components/facebook';


const App = () => (
  <div>
    <nav className="navbar navbar-custom navbar-fixed-top" id="navbar-bottom">
      <div className="container navbar-header">
        <Link to="/" className="navbar-brand" id="text">Home</Link>
        <Link to="/users/new" id="text">Add a New User</Link>
        <Facebook/>
      </div>
    </nav>


    <Switch>
      <Route path="/users/new" component={AddUserForm} /> // positioning matters
      <Route path="/users/:id" component={ShowUser} />
      <Route exact path="/" component={Users} />

      <Route component={errorPage} />
    </Switch>
  </div>


)

export default App

// whatever's on this page is going to render across all the pages of your app. The reason for this is in react_app.js, under return, < app /> is the child component of react_app.
