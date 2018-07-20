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
      docs: []
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
      console.log(res)
      if(res.err) return alert('Error')
      this.setState({docs: res.docs})
    })
  }

  componentDidMount(){
    this.loadDocuments()
  }

  onLogout = () => {
    fetch('http://localhost:8888/logout', {
      method: 'GET',
    })
    .then((response) => response.text())
    .then((text) => {
      this.props.redirect('Home')
    })
    .catch((error) => {
      console.log(error);
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
    console.log(this.props.userId, this.props.collabId)
    this.props.socket.emit('collaborateDocument', {userId: this.props.userId, docId: this.props.collabId}, (res)=> {
      console.log(res)
      if(res.err) {
        return alert ('Error')
      }else{
        this.props.redirect('CreateDoc', this.props.collabId);
      }
    })
  }

  link = (id) => {
      this.props.redirect('CreateDoc', id);
  }

  deleteDocument = (docId) =>{
    this.props.socket.emit('deleteDocument', {docId: docId}, (res) =>{
      if (res.err) {
        return alert (res.err)
      }
      else{
        alert('Your document has deleted!');
        this.loadDocuments()
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
              Title: <input onChange={(event) => this.props.addTitle(event)}  type="text"/><br/>
              Password: <input onChange={(event)=> this.props.addPassword(event)} type="text"/>
            </div>
          </form>
          <button onClick={this.props.onCreate}>Create New</button>
          <button onClick={this.closeNewDocModal}>Cancel</button>
        </Modal>

        <button onClick={this.openModal}>Edit Existing Doc</button>
        <Modal isOpen={this.state.modalIsOpen} style={customStyles}>
          <h2 ref={subtitle => this.subtitle = subtitle}>Add Doc By ID</h2>
          <form>
            <div>
              Document ID: <input onChange={this.props.addCollab} type="text"></input>
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
                  <Item.Header as='a' onClick={() => this.link(this.props.collabId)}>{doc.title}</Item.Header>
                  <Item.Meta>
                    <span className='creator'>Creator: {doc.collabs[0].username}</span>
                  </Item.Meta>
                  <Item.Description>Collaborators: {doc[0]}</Item.Description>
                  <Item.Extra>
                    <Button onClick = {() => this.deleteDocument(doc._id)} floated='right' id="delete-button"><Icon name='trash' /></Button>
                  </Item.Extra>
                </Item.Content>
              </Item>)}
            </Item.Group>
          </div>
          <div>
            <button className="Logout" type="submit" onClick={this.onLogout}>Logout</button>
          </div>
        </div>
      )
    }
  }
