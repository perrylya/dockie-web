import React from 'react';
import {Editor, EditorState} from 'draft-js';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Button, Icon, Image as ImageComponent, Item, Label } from 'semantic-ui-react'
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
      modal2IsOpen: false,
      existingDocs: data,
      docs: [],
      title: '',
      password: '',
    };

    this.openNewDocModal = this.openNewDocModal.bind(this);
    this.closeNewDocModal = this.closeNewDocModal.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //requesting to load all the documents from database
  loadDocuments=()=> {
    this.props.socket.on('connect', () => this.setState({connecting: null}))
    this.props.socket.on('disconnect', () => this.setState({connecting: true}))
    this.props.socket.emit('getDocuments', {userId: this.props.userId}, (res)=> {
      if(res.err) return alert ('Error')
      this.setState({docs: res.docs})
    })
  }

  componentDidMount(){
    this.loadDocuments()
  }

  onCreate=()=>{
    this.props.socket.emit('createDocument', {title:this.state.title, password: this.state.password, userId: this.props.userId}, (res) => {
      if (res.err) {
        return alert (res)
      }else{
        this.props.redirect('CreateDoc', res.doc._id)
      }
    })
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

  addPassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  addTitle(event) {
    this.setState({
      title: event.target.value
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
    })
    this.props.redirect('CreateDoc')
  }

  updateDocument = () => {
    this.props.socket.emit('collaborateDocument', {userId: this.props.userId, docId: this.state.title}, (res)=> {
      if(res.err) {
        return alert ('Error')
      }
      else if(res.success){
        this.props.redirect('CreateDoc', this.state.title);
      }
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
              Title: <input onChange={(event) => this.addTitle(event)}  type="text"/><br/>
              Password: <input onChange={(event)=> this.addPassword(event)} type="text"/>
            </div>
          </form>
          <button onClick={this.onCreate}>Create New</button>
          <button onClick={this.closeNewDocModal}>Cancel</button>
        </Modal>

        <button onClick={this.openModal}>Edit Existing Doc</button>
        <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
          <h2 ref={subtitle => this.subtitle = subtitle}>Add Doc By ID</h2>
          <form>
            <div>
              Document ID: <input onChange={(event) => this.addTitle(event)} type="text"></input>
            </div>
          </form>
          <button onClick={this.updateDocument}>Update</button>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
        <div>
          <br/>
        <Item.Group divided>
        {this.state.docs.map(doc =>
            <Item>
              <Item.Content>
                <Item.Header as='a'>{doc.title}</Item.Header>
                <Item.Meta>
                  <span className='creator'>Creator: {doc.creator}</span>
                </Item.Meta>
                <Item.Description>Collaborators: {doc.collabs}</Item.Description>
              </Item.Content>
            </Item>)}
          </Item.Group>
      </div>
    </div>
  )
}
}
