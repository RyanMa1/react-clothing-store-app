import React from 'react';
import {Switch,Route} from 'react-router-dom' 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Cart from './components/Cart'
import Default from './components/Default.js'
import Details from './components/Details.js'
import Navbar from './components/Navbar.js'
import ProductList from './components/ProductList.js'
import Model from './components/Model.js'

class App extends React.Component {
  render(){
    return (
      <React.Fragment>
        {/* excluding Nav bar from switch so it can appear on each component */}
        <Navbar></Navbar>

        <Switch>
          {/* path = '/' is for homepage, component attributes points to the component where to go to */}
          {/* 'exact path' is the home page */}
        <Route exact path = '/' component = {ProductList} ></Route>
        <Route path = '/details' component = {Details}></Route>
        <Route path = '/cart' component = {Cart}></Route>
        <Route component = {Default}></Route>
        </Switch>
        <Model></Model>
        
  
        
       
      </React.Fragment>
      );
  }
  }
export default App;
