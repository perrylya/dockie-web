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

  onLogin = () => {
    fetch('http://localhost:8888/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.name,
        password: this.state.password
      })
    })
    .then((response) => response.text())
    .then((text) => {
      this.setState({loggedIn: text})
    })
    .catch((error) => {
      alert(error)
    })
  }

  render(){
    return (
      <div className = "login">
        {this.state.loggedIn ?
          <Documents />
          :
          <div className = "input-container">
            <Input onChange = {this.onNameChange}  className = "field" placeholder = "Username..."/>
            <br/>
            <Input onChange = {this.onPassChange}  className = "field" placeholder = "Password..."/>
            <br />
            <Button className = "login-button" onClick = {this.onLogin} primary animated >
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name='right arrow' />
              </Button.Content>
            </Button>
          </div>
        }
      </div>

    );
  }
}
export default LoginScreen;
