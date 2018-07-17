import React, {Component} from 'react';
import Documents from './Documents'

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

onLogin() {
  fetch('/login'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.state.name,
      password: this.state.password
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({loggedIn: responseJson})
    })
    .catch((error) => {
      alert(error)
    })
  }
}

  render(){
    return (
      <div>
        {this.state.loggedIn ?
          <Documents />
        :
        <div>
          <input onChange = {this.onNameChange} className = "field" placeholder = "Username"/>
          <input onChange = {this.onPassChange} className = "field" placeholder = "Password"/>
          <button onClick = {this.onLogin}>Login</button>
        </div>
        }
      </div>

    );
  }
}
export default LoginScreen;
