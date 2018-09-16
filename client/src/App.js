import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import CategoryList from './components/categorylist/CategoryList';
import Category from './components/category/Category';
import Beer from './components/beer/Beer';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h2>Welcome to the Beer API demo</h2>
          <Link to='/categorylist'>See the category list</Link>
          <Route path='/categorylist' exact component={CategoryList} />
          <Route path='/category/:id' exact component={Category} />
          <Route path='/beer/:id' exact component={Beer} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
