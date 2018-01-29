import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      shrink: false
    }
  }

render() {
console.log(this.props)
  return (
    <div className= {this.props.size}>  
      <div className='top'>
    
        <p className='welcome'>Welcome to </p>
      </div> 
      <div className = 'logo'>
        <img className ='icon' src={ require('./icon.svg') } />
        <h1>Headcount 2.0</h1>
      </div>  
      <p> A simulated data search app built in React </p>
    </div>
  )
 }
}

export default Header;