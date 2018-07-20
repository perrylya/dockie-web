import React, {Component} from 'react';
import Documents from './Documents'

class RegisterScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: '',
      email:'',
      passwordRepeat:''
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
      if(text === 'incomplete') {
        alert('Please fill in all fields.')
      } else if(text === 'passwords') {
        alert('Passwords must match.')
      } else if(text === 'exists') {
        alert('Account already exists. Please log in.')
        this.props.redirect('Home')
      } else {
        this.props.redirect('Home')
      }
    })
    .catch((error) => {
      console.log(error);
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
