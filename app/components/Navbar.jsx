import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import UserContainer from '../containers/UserContainer'



export default class Navbar extends React.Component{
  

  constructor(props) {
    super(props)
    this.state = {
      logged: {}, 
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({logged: nextProps.isLoggedin});
  }
  
  render() {
  const logged = this.state.logged;
  const Logout = () => (
    <FlatButton
      label={"Logout"}
      onClick={this.props.processLogout}
    />
  )

 const Login = () => (
    <FlatButton
      label={"Login"}
      onClick={this.props.openSignin}
    />
  )
 
  return(
    <AppBar 
      title="VoteDish"
      showMenuIconButton={false}
      iconElementRight={logged ? <Logout /> : <Login />}
    />
  )
  }
}