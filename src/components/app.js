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
      <div className="main-container">
        {this.state.currentPage === 'Home' ?
        <div className = "login-container">
          <h1>Welcome to Dockie</h1>
          <LoginScreen />
          <br/>
          <Button color = 'green' className = "register-button"  animated onClick = {() => this.redirect('Register')}>
            <Button.Content visible>Register</Button.Content>
            <Button.Content hidden>
              <Icon name='right arrow' />
            </Button.Content>
          </Button>
        </div> : null}
        {this.state.currentPage === 'Register' ? <div><RegisterScreen /></div> : null}
        {this.state.currentPage === 'Documents' ? <Documents redirect={() => this.redirect}/> : null}
        {this.state.currentPage === 'CreateDoc' ? <CreateDoc redirect={() => this.redirect}/> : null}
      </div>
    )
  }
}

export default App;
