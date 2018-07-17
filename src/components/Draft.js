
import React from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createCounterPlugin from 'draft-js-counter-plugin';
import {EditorState} from 'draft-js';
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

const counterPlugin = createCounterPlugin();
const { CharCounter, WordCounter, LineCounter, CustomCounter } = counterPlugin;


class HeadlinesPicker extends React.Component {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick(){
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined)
  }

  render(){
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
  onClick(){
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);
  }

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
const plugins = [toolbarPlugin, counterPlugin];



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
  headlineButtonWrapper:{
    display: "inline-block",
  },
  headlineButton : {
    background: "#fbfbfb",
    color: "#888",
    fontSize: "14px",
    border: "0",
    paddingTop: "5px",
    verticalAlign: "bottom",
    height: "34px",
    width: "36px",
  },
  headlineButton:"hover",
}



