import React from 'react';
import Documents from './Documents.js';
import CreateDoc from './CreateDoc.js';
import LoginScreen from './Login';
import RegisterScreen from './Register'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentPage: 'Home'
    })
    this.redirect= this.redirect.bind(this)
  }

  redirect(page) {
    this.setState({
      currentPage: page
    })
  }

  render() {
    return(
      <div>
        <h1>Welcome to Dockie</h1>
        {this.state.currentPage === 'Home' ?
        <div><button onClick={() => this.redirect('Login')}>Login</button><br/><button onClick={() => this.redirect('Register')}>Register</button></div> : null}
        {this.state.currentPage === 'Login' ? <div><LoginScreen /><br/><button onClick={() => this.redirect('Register')}>Register</button></div> : null}
        {this.state.currentPage === 'Register' ? <div><RegisterScreen /><button onClick={() => this.redirect('Login')}>Login</button></div> : null}
        {this.state.currentPage === 'Documents' ? <Documents redirect={this.redirect}/> : null}
        {this.state.currentPage === 'CreateDoc' ? <CreateDoc redirect={this.redirect}/> : null}
      </div>
    )
  }
}

export default App;
