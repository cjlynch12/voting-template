import React from 'react';
import {BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';

import PollList from '../components/PollList';
import LoginForm from '../components/LoginForm';

import Navbar from '../components/Navbar';
import UserContainer from './UserContainer';
import axios from 'axios';


export default class Base extends React.Component {
  constructor() {
    super()
      this.state = {
        signinOpen: false,
        isLoggedin: {},
        errors: ''
      }  
  
    
  }
  
  componentDidMount(){
    if(document.cookie){
      this.setState({isLoggedin: true})
    } else {
      this.setState({isLoggedin: false})
    }
  }
  
  
  processLogin = (user) => {
    //event.preventDefault();
    console.log('login')
    console.log('email:', user.email);
    console.log('password:', user.password);
    axios.post('/users/login', {
      username: user.email,
      password: user.password
    })
    .then(response => {
      console.log(response.data)
      this.setState({signinOpen : false});
      this.setState({isLoggedin: true});
    })
    .catch(error => {
      console.log(error.response.data.message);
      this.setState({errors: error.response.data.message});
    })
    
    
  }
  
 processSignup = (user) => {
    console.log('signing up...');
    
    let name = user.name;
    let username = user.email;
    let password = user.password;
    
      axios.post('/users/signup', {
        name: name,
        username: username,
        password: password
      })
      .then(response => {
      console.log(response);
      this.setState({signinOpen: false});
      this.setState({isLoggedin: true});
      })
      .catch(error => {
        console.log(error.response.data.message)
        this.setState({errors: error.response.data.message});                
      });
  }
  
  processLogout = () => {
    console.log('logging out...');
    axios.get('/users/logout')
    .then(response => {
    console.log('logged out!');
    this.setState({isLoggedin: false});
    //refresh page to clear all states and redirect to '/'
    window.location.reload();
    })
  }
  
  openSignin = () => {
    console.log('open sign in menu')
    this.setState({signinOpen: true});
  }
  
  
  closeSignin = () => {
    console.log('close sign in menu')
    this.setState({signinOpen: false});
  }
  
  render(){
    return (
      <BrowserRouter>
        <div>
          <Navbar 
            isLoggedin={this.state.isLoggedin} 
            processLogout={this.processLogout}
            openSignin={this.openSignin} 
          />
          <UserContainer 
            processLogin={this.processLogin}
            processSignup={this.processSignup}
            openSignin={this.state.signinOpen} 
            closeSignin={this.closeSignin}
            processErrors={this.state.errors}
          />
          <Switch>
            <Route exact path='/' component={ Home } />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
};