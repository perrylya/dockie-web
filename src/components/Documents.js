import React from 'react';
import {Editor, EditorState} from 'draft-js';
import ReactDOM from 'react-dom';



export default class Documents extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h2 className='Documents'>
          Create/Edit Documents
        </h2>
        <button onClick={() => this.props.redirect('Home')}>Go back to Homepage</button>
        <button onClick={() => this.props.redirect('CreateDoc')}>Create New Document</button>
      </div>
    )
  }
}
