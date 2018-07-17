import React from 'react';
import Documents from './Documents.js';
import CreateDoc from './CreateDoc.js';
import LoginScreen from './Login';
import RegisterScreen from './Register'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentPage: 'Home',
      // docId: null
      // creatorId: null 
    })
    this.redirect= this.redirect.bind(this)
  }

  // //editPage(id){
  //     this.setState({
  //       docId: id
  //     })
  // // }

  redirect(page) {
    this.setState({
      currentPage: page
    })
  }

  render() {
    return(
      <div>
<<<<<<< HEAD
        <h1>Welcome to Dockie</h1>
        {this.state.currentPage === 'Home' ?
        <div><button onClick={() => this.redirect('Login')}>Login</button><br/><button onClick={() => this.redirect('Register')}>Register</button></div> : null}
        {this.state.currentPage === 'Login' ? <div><LoginScreen /><br/><button onClick={() => this.redirect('Register')}>Register</button></div> : null}
        {this.state.currentPage === 'Register' ? <div><RegisterScreen /><button onClick={() => this.redirect('Login')}>Login</button></div> : null}
        {this.state.currentPage === 'Documents' ? <Documents redirect={this.redirect}/> : null}
=======
        <h2>
          <RegisterScreen />
        {this.state.currentPage === 'Home' ? <div><h1>WELCOME TO: DOCKIE</h1><button onClick={() => this.redirect('Documents')}>Login</button></div> : null}
        {this.state.currentPage === 'Documents' ? <Documents editPage={this.editPage} redirect={this.redirect}/> : null}
>>>>>>> sisi
        {this.state.currentPage === 'CreateDoc' ? <CreateDoc redirect={this.redirect}/> : null}
      </div>
    )
  }
}

export default App;
