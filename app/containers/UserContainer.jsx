import React from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase().trim());
}

export default class UserContainer extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      open: false,
      processErrors: '',
      formValid: true,
      formErrors: {
        name: '',
        email: '',
        password: '',
      },
      user: {
        name: '',
        email: '',
        password: ''
      }
    };
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({open: nextProps.openSignin})
    this.setState({processErrors: nextProps.processErrors})
    
  }
  
  handleTabChange = () => {
    this.setState({
      user: {name: '', email: '', password: ''},
      formErrors: {name: '', email: '', password: ''}
    });
  }
  
  handleOpen = () => {
    this.setState({
      open: true
    })
  }
          
  
  handleClose = () => {
    this.props.closeSignin();
    this.setState({
      user: {name: '', email: '', password: ''}
    });
    this.setState({
      formErrors: {}
    });
  }
  
  changeUser = (event) => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    
    this.setState({
      user
    });
    
  }
  
  
  handleSignupSubmit = (event) => {
    event.preventDefault();
    let {name, email, password} = this.state.user;
    //clear form errors on submit
    let formErrors = {name: '', email: '', password: ''};
    //check for new errors
    if (name === '' || (!validateEmail(email)) || password.length < 8) {
      if (name === '') formErrors.name = 'You must provide a name';
      if (!validateEmail(email)) formErrors.email = 'You must provide a valid email address';
      if (password.length < 8) formErrors.password = 'Your password must be at least 8 characters in length';
      this.setState({formErrors});
      return;
    } else {
      this.props.processSignup({name, email, password});
    }
    
  }
  
  handleLoginSubmit = (event) => {
    event.preventDefault();
    let {email, password} = this.state.user;
    let formErrors = {email: '', password: ''};
    if (!validateEmail(email) || password === '') {
      if (!validateEmail(email)) formErrors.email = 'You must provide a valid email address to log in.'
      if (password === '') formErrors.password = 'You must provide a password to log in.'
      this.setState({formErrors});
      return;
    } else {
    this.props.processLogin({email,password})
    }
  }
  
  
  render(){
    return(
      <div>
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          <Tabs
            onChange={this.handleTabChange}  
          >
            <Tab label="Login">
              <LoginForm 
                onChange={this.changeUser}
                onSubmit={this.handleLoginSubmit}
                user={this.state.user}
                processErrors={this.state.processErrors}
                formErrors={this.state.formErrors}
              />
            </Tab>
            <Tab label="Sign Up">
              <SignUpForm 
                onSubmit={this.handleSignupSubmit}
                onChange={this.changeUser}
                user={this.state.user}
                formErrors={this.state.formErrors}
                processErrors={this.state.processErrors}
              />
            </Tab>
          </Tabs>

        </Dialog>
      </div>
    )
  }
  
}