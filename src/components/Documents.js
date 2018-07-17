import React from 'react';
import {Editor, EditorState} from 'draft-js';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
Modal.setAppElement(document.getElementById('App'))

var data = [
  {documentId: '1'},
  {documentId: '2'}
]

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      existingDocs: data,
      docId: ''
    };

    this.openNewDocModal = this.openNewDocModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openNewDocModal() {
    this.setState({modalIsOpen: true});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
  }

  addName(event) {
    this.setState({
      docId: event.target.value
    })
  }

  addModal = () => {
    var newDocs = this.state.existingDocs.slice()
    var newObj = {};

    newObj.documentId = this.state.docId
    newDocs.push(newObj)

    this.setState({
      modalIsOpen: false,
      existingDocs: newDocs
    })
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return(
      <div>
        <h2 className='Documents'>
          Create/Edit Documents
        </h2>
        <button onClick={() => this.props.redirect('CreateDoc')}>Create New Document</button>
        {/* <button onClick={this.openNewDocModal}>Create New Doc</button>
        <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
          <h2 ref={subtitle => this.subtitle = subtitle}>New Doc</h2>
          <form>
            <div>
              New Document
            </div>
          </form>
          <button onClick={this.addModal}>Create New</button>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal> */}

        <button onClick={this.openModal}>Edit Existing Doc</button>
        <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
          <h2 ref={subtitle => this.subtitle = subtitle}>Add Doc By ID</h2>
          <form>
            <div>
              Document ID: <input onChange={(event) => this.addName(event)} value={this.state.docId} type="text"></input>
            </div>
          </form>
          <button onClick={this.addModal}>Update</button>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
        <div>
          {this.state.existingDocs.map(id => <div>{id.documentId}</div>)}
        </div>
      </div>
    )
  }
}
