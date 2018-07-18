
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


// class HeadlinesPicker extends React.Component {
//   componentDidMount() {
//     setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
//   }
//
//   componentWillUnmount() {
//     window.removeEventListener('click', this.onWindowClick);
//   }
//
//   onWindowClick(){
//     // Call `onOverrideContent` again with `undefined`
//     // so the toolbar can show its regular content again.
//     this.props.onOverrideContent(undefined)
//   }
//
//   render(){
//     const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
//     return (
//       <div>
//         {buttons.map((Button, i) => // eslint-disable-next-line
//           <Button key={i} {...this.props} />
//         )}
//       </div>
//     );
//   }
// }

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
        editorState: EditorState.createEmpty()
        // creatorId: this.props.user._id ,

        };
      }

    //  componentDidMount() {
    // // fetch Document by ID to database and then set the state of current doc
    // // fetch request to server
    // // this.setState({
    //
    // // })
    //   fetch('/content').then(val => val.json())
    //   .then(rawContent => {
    //     if (rawContent) {
    //       this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(rawContent))) })
    //     } else {
    //       this.setState({ editorState: EditorState.createEmpty() });
    //     }
    //   });
    // }

  onChange(editorState){
    const contentState = editorState.getCurrentContent()
    this.saveContent(contentState)
    this.setState({ editorState });
    console.log(convertToRaw)
    //convertToRaw(content) post route to document ID


    // socket.emit("updateDoc", {content:this.state.content})//live collaboration
  };

  saveContent =(content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)))
  }


  focus(){
    this.editor.focus();
  };

  customCountFunction(str) {
    const wordArray = str.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }

  render() {
    return (
      <div className='Text'>
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
    width:"150%",
    border: "1px solid #ddd",
    cursor: "text",
    padding: "16px",
    borderRadius: "2px",
    marginBottom: "2em",
    boxShadow: "inset 0px 1px 8px -3px #ABABAB",
    background: "#fefefe",
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
