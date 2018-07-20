
import React from 'react';
import User from '../models/user'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createCounterPlugin from 'draft-js-counter-plugin';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import createUndoPlugin from 'draft-js-undo-plugin';


// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;


const counterPlugin = createCounterPlugin();
const { CharCounter, WordCounter, LineCounter, CustomCounter } = counterPlugin;

class HeadlinesPicker extends React.Component {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}

class HeadlinesButton extends React.Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className={editorStyles.headlineButtonWrapper}>
        <button onClick={this.onClick} className={editorStyles.headlineButton}>
          H
        </button>
      </div>
    );
  }
}
const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
  ]
});
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin, counterPlugin, undoPlugin];


export default class CreateDoc extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      document: null,
      editorState: EditorState.createEmpty(),
      docId: this.props.docId
    };
  }


  componentDidMount() {
    var self = this
    console.log("componentdidmount",this.props)
    this.props.socket.emit('openDocument', {docId: this.props.docId}, (res) => {
      console.log('opendocument')
      self.setState({
        document: res.doc,
      })
      res.doc.rawState && self.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.doc.rawState)))})

    })

    this.props.socket.on('syncDocument', (data) => {
      console.log("sync doc", data)
      self.setState({
        editorState: EditorState.createWithContent(convertFromRaw(data.rawState))
      })
    })

  }

  // componentWillUnmount() {
  //   socket.off('syncDocument', (data)=>{
  //     console.log(data)
  //     this.setState({
  //       editorState: EditorState.createWithContent(convertFromRaw(data.rawState))
  //     })
  //   })
  //   // socket.emit('closeDocument', {docId: options.docId}, (res) => {
  //   //   if(res.err) return alert('Opps Error')
  //   //   this.setState({ docs: res.docs })
  //   // })
  // }

  onChange=(editorState)=>{
    // const contentState = editorState.getCurrentContent()
    // convertToRaw(contentState)
    this.props.socket.emit('syncDocument', {
      rawState: convertToRaw(editorState.getCurrentContent()),
      docId: this.props.docId
    })
    console.log('onChange')
    this.setState({editorState}, ()=> {
   
    })
  }
    

  onSave = () => {
    console.log(save)
    this.props.socket.emit('saveDocument', {
      docId: this.props.docId,
      rawState: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    }, (res) => {
      if(res.err) {
        return alert('Opps Error')
      }else{
        alert('Saved')
      }

    })
  }

  onExit = () => this.props.redirect('Documents')

  onRevision = () => this.props.redirect('RevisionHistory')

  // focus(){
  //   this.editor.focus();
  // };

  customCountFunction(str) {
    const wordArray = str.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }

  render() {
    console.log("render")
    return (
      <div className='Textbox'>
        <h2 className='CreateDoc'>{this.props.title}</h2>
          <div style={editorStyles.button}>

          </div>
        <div style={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
             <Toolbar/>
            <div>
            <UndoButton />
            <RedoButton />
            </div>

        </div>
        <button onClick={() => this.props.redirect('Home')}>Go Home!</button>
        <button onClick={this.onSave}>Save</button>
        <button onClick={this.onExit}>Document List</button>
        {/* <button onClick={this.onRevision}>Revision History</button> */}

        <div><CharCounter limit={200} /> characters</div>
        <div><WordCounter limit={30} /> words</div>
        <div><LineCounter limit={10} /> lines</div>
        <div>
          <CustomCounter limit={40} countFunction={this.customCountFunction.bind(this)} />
          <span> words (custom function)</span>
        </div>
        <br />
        <br />
      </div>
    );
  }
}


const editorStyles={
  editor:{
    boxSizing: "border-box",
    width:"100%",
    border: "1px solid #ddd",
    cursor: "text",
    padding: "16px",
    borderRadius: "2px",
    marginBottom: "2em",
    boxShadow: "inset 0px 1px 8px -3px #ABABAB",
    background: "#fefefe",
    height: '-webkit-fill-available'
  },
  headlineButtonWrapper:{
    display: "inline-block",
  },
  headlineButton : {
    background: "#fbfbfb",
    color: "#888",
    fontSize: "10px",
    border: "0",
    paddingTop: "5px",
    verticalAlign: "bottom",
    height: "34px",
    width: "36px",
  },
  headlineButton:"hover",
  // toolbar :{
  //   border: "1px solid #111",
  //   background: "#333",
  //   borderRadius: "4px",
  //   boxShadow: "0px 1px 3px 0px rgba(220,220,220,1)",
  //   zIndex: "2",
  //   boxSizing: "border-box"
  // },
  buttonWrapper:{
    display: "inline-block"
  },
  button:{
    fontSize: "18px",
    border: "0",
    paddingTop: "5px",
    verticalAlign: "bottom",
    height: "34px",
    width: "30%",
    borderRadius: "4px",
    display:"block",
    flexDirection:"row"
  },
  active :{
    color: "#6a9cc9"
  }

}
