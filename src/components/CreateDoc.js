import React from 'react';
import Draft from './Draft'

export default class Page2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h2 className='CreateDoc'>Editing Document</h2>
          <Draft />
        <button onClick={() => this.props.redirect('Home')}>Go Home!</button>
      </div>
    )
  }
}