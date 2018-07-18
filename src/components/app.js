import React from 'react';
import Documents from './Documents.js';
import CreateDoc from './CreateDoc.js';
import LoginScreen from './Login';
import RegisterScreen from './Register'
import {Button, Icon} from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentPage: 'Home',
      userId: '',
    })
    this.redirect= this.redirect.bind(this)
  }

  onLogin = (name, password) => {
    fetch('http://localhost:8888/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        password: password
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((text) => {
      console.log(text)
      this.setState({
        userId: text.userId
      })
      text.success ? this.redirect('Documents') : alert('invalid login')
    })
    .catch((error) => {
      alert(error)
    })
  }


  redirect(page) {
    this.setState({
      currentPage: page
    })
  }

  render() {
    console.log(this.state.currentPage)
    return(
      <div className="main-container">
        {this.state.currentPage === 'Home' ?
        <div className = "login-container">
          <h1>Welcome to Dockie</h1>
          <LoginScreen onLogin={this.onLogin}  redirect={(e) => this.redirect(e)}/>
          <br/>
          <Button color = 'green' className = "register-button"  animated onClick = {() => this.redirect('Register')}>
            <Button.Content visible>Register</Button.Content>
            <Button.Content hidden>
              <Icon name='right arrow' />
            </Button.Content>
          </Button>
        </div> : null}
        {this.state.currentPage === 'Register' ? <div><RegisterScreen /></div> : null}
        {this.state.currentPage === 'Documents' ? <Documents userId={this.state.userId} redirect={(e) => this.redirect(e)}/> : null}
        {this.state.currentPage === 'CreateDoc' ? <CreateDoc redirect={(e) => this.redirect(e)}/> : null}
      </div>
    )
  }
}

export default App;
