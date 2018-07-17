import React from 'react';
import {Editor, EditorState} from 'draft-js';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
<<<<<<< HEAD
import ActionSettingsInputComponent from 'material-ui/SvgIcon';
=======
Modal.setAppElement(document.getElementById('App'))

var data = [
  {documentId: '1'},
  {documentId: '2'}
]
>>>>>>> 1e0c49a4f5b6669b863c2a5c36570cdd7dc91398

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
      modal2IsOpen: false,
      existingDocs: data,
      docId: '',
      currentPage: 'Home'
    };

    this.openNewDocModal = this.openNewDocModal.bind(this);
    this.closeNewDocModal = this.closeNewDocModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openNewDocModal() {
    this.setState({modal2IsOpen: true});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
  }

  addNewDocName(event) {
    this.setState({
      docId: event.target.value
    })
  }

  addName(event) {
    this.setState({
      docId: event.target.value
    })
  }

  addNewDocModal = () => {
    var newDocs = this.state.existingDocs.slice()
    var newObj = {};

    newObj.documentId = this.state.docId
    newDocs.push(newObj)

    this.setState({
      modalIsOpen: false,
      existingDocs: newDocs,
      currentPage: 'CreateDoc'
    })
    this.props.redirect('CreateDoc')
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

  closeNewDocModal() {
    this.setState({modal2IsOpen: false});
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

        <button onClick={this.openNewDocModal}>Create New Doc</button>
        <Modal isOpen={this.state.modal2IsOpen} style={customStyles}>
          <h2 ref={subtitle => this.subtitle = subtitle}>New Doc</h2>
          <form>
            <div>
              Title: <input onChange={(event) => this.addName(event)} value={this.state.docId} type="text"></input><br/>
              Password: <input />
            </div>
          </form>
          <button onClick={this.addNewDocModal}>Create New</button>
          <button onClick={this.closeNewDocModal}>Cancel</button>
        </Modal>

        <button onClick={this.openModal}>Edit Existing Doc</button>
<<<<<<< HEAD
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}>

            <h2 ref={subtitle => this.subtitle = subtitle}>Add Doc By ID</h2>
            <form>
              <input/>
              <button onClick={this.afterOpenModal}>add</button>
              <button onClick={this.closeModal}>close</button>
            </form>
=======
        <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
          <h2 ref={subtitle => this.subtitle = subtitle}>Add Doc By ID</h2>
          <form>
            <div>
              Document ID: <input onChange={(event) => this.addName(event)} value={this.state.docId} type="text"></input>
            </div>
          </form>
          <button onClick={this.addModal}>Update</button>
          <button onClick={this.closeModal}>Cancel</button>
>>>>>>> 1e0c49a4f5b6669b863c2a5c36570cdd7dc91398
        </Modal>
        <div>
          {this.state.existingDocs.map(id => <div>{id.documentId}</div>)}
        </div>
      </div>
    )
  }
}
