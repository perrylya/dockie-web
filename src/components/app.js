import React from 'react';
import Documents from './Documents.js';
import CreateDoc from './CreateDoc.js';
import LoginScreen from './Login';
import DocumentsStyle from './DocumentsStyle'

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
        <h2>
        {this.state.currentPage === 'Home' ? <div><h1>WELCOME TO: DOCKIE</h1><button onClick={() => this.redirect('Documents')}>Login</button></div> : null}
        {this.state.currentPage === 'Documents' ? <Documents redirect={this.redirect}/> : null}
        {this.state.currentPage === 'CreateDoc' ? <CreateDoc redirect={this.redirect}/> : null}
        </h2>
      </div>
    )
  }
}

export default App;
