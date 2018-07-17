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

onRegister = () => {
  fetch('https://localhost:8888/signup', {
    method: 'POST',
    dataType: 'JSON',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      username: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
  })
  .then((response) => response.text())
  .then((text) => {
    this.setState({isRegistered: text})
  })
  .catch((error) => {
    alert(error)
  })
}

  render(){
    return (
      <div>
        <div>
          <input onChange = {this.onEmailChange} className = "field" placeholder = "Email Address"/>
          <input onChange = {this.onNameChange} className = "field" placeholder = "Username"/>
          <input onChange = {this.onPassChange} className = "field" placeholder = "Password"/>
          <button onClick = {this.onRegister}>Register</button>
        </div>
      </div>

    );
  }
}
export default RegisterScreen;
