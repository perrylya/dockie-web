import React from 'react';
import Documents from './Documents.js';
import CreateDoc from './CreateDoc.js';
import LoginScreen from './Login';
import RegisterScreen from './Register'
import {Button, Icon} from 'semantic-ui-react';
import RevisionHistory from './RevisionHistory.js'
import io from 'socket.io-client'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:8888')
    this.state = ({
      currentPage: 'Home',
      userId: '',
      docId: '',
      collabId:'',
      title: '',
      password: '',
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
      this.setState({
        userId: text.userId
      })
      text.success ?
      this.redirect('Documents')
      :
      alert('Invalid Login')
    })
    .catch((error) => {
      alert('Invalid Login')
    })
  }

  addPassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  addTitle(event) {
    this.setState({
      title: event.target.value
    })
  }

  onCreate=()=>{
    this.socket.emit('createDocument', {title:this.state.title, password: this.state.password, userId: this.state.userId}, (res) => {
      if (res.err) {
        return alert (res)
      }else{
        this.redirect('CreateDoc', res.doc._id)
      }
    })
  }

  addCollab = (event) =>{
    this.setState({collabId: event.target.value})
  }

  redirect(page, docId) {
    if(docId) {
      this.setState({currentPage: page, docId: docId})
    } else {
      this.setState({
        currentPage: page
      })
    }
  }

  render() {

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
        {this.state.currentPage === 'Register' ? <div><RegisterScreen redirect={(e) => this.redirect(e)}/></div> : null}
        {this.state.currentPage === 'Documents' ? <Documents socket={this.socket} userId={this.state.userId} collabId={this.state.collabId} addCollab={(e) => this.addCollab(e)} addPassword={(e) => this.addPassword(e)} addTitle={(e) => this.addTitle(e)} onCreate={this.onCreate} redirect={(e) => this.redirect(e)}/> : null}
        {this.state.currentPage === 'CreateDoc' ? <CreateDoc socket={this.socket} title={this.state.title} docId ={this.state.docId} collabId={this.state.collabId} redirect={(e) => this.redirect(e)}/> : null}
        {this.state.currentPage === 'RevisionHistory' ? <RevisionHistory redirect={this.redirect}/> : null}
      </div>
    )
  }
}

export default App;
