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
        <h2>
          <RegisterScreen />
        {this.state.currentPage === 'Home' ? <div><h1>WELCOME TO: DOCKIE</h1><button onClick={() => this.redirect('Documents')}>Login</button></div> : null}
        {this.state.currentPage === 'Documents' ? <Documents editPage={this.editPage} redirect={this.redirect}/> : null}
        {this.state.currentPage === 'CreateDoc' ? <CreateDoc redirect={this.redirect}/> : null}
        </h2>
      </div>
    )
  }
}

export default App;
