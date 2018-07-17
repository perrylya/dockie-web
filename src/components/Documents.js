import React from 'react';
import {Editor, EditorState} from 'draft-js';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
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

        <button onClick={this.openModal}>Add Existing Doc</button>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}>

            <h2 ref={subtitle => this.subtitle = subtitle}>Add Doc By ID</h2>
            <form>
              <input />
              <button onClick={this.afterOpenModal}>add</button>
              <button onClick={this.closeModal}>close</button>
            </form>
        </Modal>
      </div>
    )
  }
}
