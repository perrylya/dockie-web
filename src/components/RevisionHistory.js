import React from 'react'

export default class RevisionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      date: new Date()
    })
  }




  render() {
    return (
      <div>
        <h1 className="RevisionDocument">Document</h1><h2>as of {this.state.date.toUTCString()} </h2>
        <div className="RevisionDates">History</div>
      </div>
    )
  }
}
