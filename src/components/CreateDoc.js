import React from 'react';
import TextEditor from './Draft'

export default class Page2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h2 className='CreateDoc'>Editing Document</h2>
          <TextEditor />
        <button onClick={() => this.props.redirect('Home')}>Go Home!</button>
      </div>
    )
  }
}
