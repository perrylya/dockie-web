import React from 'react';
import Documents from './Documents';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default class DocumentsStyle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Documents redirect={this.redirect}/>
      </div>
    )
  }
}
