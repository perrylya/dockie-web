
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


const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
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
      docId: this.props.collabId
    };
  }

  componentDidMount() {
    this.props.socket.emit('openDocument', {collabId: this.props.collabId}, (res) => {
      this.setState({
        document: res.doc,
      })
      const content = res.doc.rawState
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      })
      this.prop.socket.on('syncDocument',this.remoteStateChange)
    })
  }

  remoteStateChange=(res)=> {
    this.setState({
      editorState: EditorState.createWithContent(convertFromRaw(res.rawState))
    })
  }

  // componentWillUnmount() {
  //   socket.off('syncDocument', this.remoteStateChange)
  //   socket.emit('closeDocument', {docId: options.docId}, (res) => {
  //     if(res.err) return alert('Opps Error')
  //     this.setState({ docs: res.docs })
  //   })
  // }

  onChange(editorState){
    const contentState = editorState.getCurrentContent()
    this.setState({editorState})
    convertToRaw(contentState)

    // this.setState({ editorState }, ()=>{
    //   this.props.socket.emit('syncDocument', {
    //     rawState: convertToRaw(editorState.getCurrentContent())
    //   })
    // });
  };

  onSave = () => {
    this.props.socket.emit('saveDocument', {
      docId: this.state.docId,
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

  focus(){
    this.editor.focus();
  };

  customCountFunction(str) {
    const wordArray = str.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }

  render() {
    return (
      <div className='Textbox'>
        <h2 className='CreateDoc'>Editing Document</h2>
        <div style={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange.bind(this)}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <div style={editorStyles.toolbar}>
            <Toolbar/>
            <UndoButton />
            <RedoButton />
          </div>

        </div>
        <button onClick={() => this.props.redirect('Home')}>Go Home!</button>
        <button onClick={this.onSave}>Save</button>
        <button onClick={this.onExit}>Document List</button>
        <button onClick={this.onRevision}>Revision History</button>

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
  toolbar:{

  }

}
