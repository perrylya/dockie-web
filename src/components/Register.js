import React, {Component} from 'react';
import Documents from './Documents'

class RegisterScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: '',
      email:'',
      passwordRepeat:'',
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

  onConfirmChange = (event) =>{
    this.setState({
      passwordRepeat: event.target.value
    })
  }

  onRegister = () => {
    fetch('http://localhost:8888/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordRepeat: this.state.passwordRepeat
      })
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
        <input onChange = {this.onEmailChange} className = "field" placeholder = "Email Address"/>
        <input onChange = {this.onNameChange} className = "field" placeholder = "Username"/>
        <input onChange = {this.onPassChange} className = "field" placeholder = "Password"/>
        <input onChange = {this.onConfirmChange} className = "field" placeholder = "Confirm Password"/>
        <button onClick = {this.onRegister}>Register</button>
      </div>

    );
  }
}
export default RegisterScreen;
