import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: ''
    }
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


render(){
  return(
    <div>
      <input onChange = {this.onNameChange} className = "field" placeholder = "Username"/>
      <input onChange = {this.onPassChange} className = "field" placeholder = "Password"/>
      <Button variant = "contained" color="primary">Login</Button>
    </div>

  )
}

