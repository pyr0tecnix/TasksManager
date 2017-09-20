import React, { Component } from 'react';
// import { Link } from 'react-router-dom'


import './Home.css';
import logo from '../../logo/logo.svg';

class Home extends Component {
  render(props) {
    return (
      <div className="flex-container">
      <section className="flex-item">
      <header>
        <h1> Tasks Manager </h1>
        <hr className = "hrLeft"></hr>
        <hr className = "hrRight"></hr>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      </section>
      </div>
    );
  }
}

export default Home;
