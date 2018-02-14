import React from 'react';
import { Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



const SignUpForm = ({ onSubmit, onChange, formErrors, processErrors, successMessage, user }) => (

  
  <Card className="formContainer">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="formHeading">Sign Up</h2>
      
     
  
      <div className="fieldLine">
        <TextField
          floatingLabelText="Name"
          name="name"
          onChange={onChange}
          value={user.name}
          errorText={formErrors.name}
        />
      </div>
  
      <div className="fieldLine">
        <TextField
          floatingLabelText="Email"
          name="email"
          onChange={onChange}
          value={user.email}
          errorText={formErrors.email}
        />
      </div>
  
      <div className="fieldLine">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
          errorText={formErrors.password}
        />
      </div>
    
      <div className="buttonLine">
        <FlatButton type="submit" label="Create New Account" primary />
      </div>
      
      <CardText>{processErrors}</CardText>
    </form>
  </Card>
);

export default SignUpForm;
    
