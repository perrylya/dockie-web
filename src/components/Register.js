import React, {Component} from 'react';
import Documents from './Documents'

class RegisterScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: '',
      email:'',
      isRegistered: false
    }
  }


onNameChange = (event) =>{
  this.setState({
    name: event.target.value
  })
}

onEmailChange = (event) =>{
  this.setState({
    email: event.target.value
  })
}

onPassChange = (event) =>{
  this.setState({
    password: event.target.value
  })
}

onRegister() {
  fetch('/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({isRegistered: responseJson})
    })
    .catch((error) => {
      alert(error)
    })
  })
}

  render(){
    return (
      <div>
          <input onChange = {this.onEmailChange} className = "field" placeholder = "Email Address"/>
          <input onChange = {this.onNameChange} className = "field" placeholder = "Username"/>
          <input onChange = {this.onPassChange} className = "field" placeholder = "Password"/>
          <button onClick = {this.onRegister}>Register</button>
      </div>

    );
  }
}
export default RegisterScreen;
