import React, {Component} from 'react';
import Documents from './Documents'
import {Button, Icon, Input} from 'semantic-ui-react';

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: '',
      loggedIn: false
    }
  }

  handleLogin =()=> {
    this.props.onLogin(this.state.name, this.state.password)
  }

  onNameChange = (event) =>{
    this.setState({
      name: event.target.value
    })
  }

  onPassChange = (event) =>{
    this.setState({
      password: event.target.value
    })
  }

  render() {

    return (
      <div className = "login">
          <div className = "input-container">
            <Input onChange = {this.onNameChange}  className = "field" placeholder = "Username..."/>
            <br/>
            <Input onChange = {this.onPassChange}  className = "field" placeholder = "Password..."/>
            <br />
            <Button id="login-button" onClick = {this.handleLogin} primary animated >
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name='right arrow' />
              </Button.Content>
            </Button>
          </div>
      </div>
    );
  }
}

export default LoginScreen;
