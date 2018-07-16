
import React from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createCounterPlugin from 'draft-js-counter-plugin';
import {EditorState} from 'draft-js';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';


const counterPlugin = createCounterPlugin();
const { CharCounter, WordCounter, LineCounter, CustomCounter } = counterPlugin;


const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, counterPlugin];
const text = 'The toolbar above the editor can be used for formatting text, as in conventional static editors  …';

export default class TextEditor extends React.Component {
      constructor(props){
      super(props)
      this.state = {
        editorState: EditorState.createEmpty(),
      };
 }
 

  onChange(editorState){
    this.setState({ editorState });
  };

  focus(){
    this.editor.focus();
  };

  customCountFunction(str) {
    const wordArray = str.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }

  render() {
    return (
      <div>
        <div style={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange.bind(this)}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <Toolbar /> 
        </div>
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
    border: "1px solid #ddd",
    cursor: "text",
    padding: "16px",
    borderRadius: "2px",
    marginBottom: "2em",
    boxShadow: "inset 0px 1px 8px -3px #ABABAB",
    background: "#fefefe",
  },
}
