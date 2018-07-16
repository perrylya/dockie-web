import React from 'react';

export default class Page2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h2 className='page2'>
          This is page #2
        </h2>
        <button onClick={() => this.props.redirect('Home')}>Go Home!</button>
      </div>
    )
  }
}
