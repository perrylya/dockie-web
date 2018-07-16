import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import createSidebarPlugin from 'last-draft-js-sidebar-plugin'
import 'last-draft-js-sidebar-plugin/lib/plugin.css'

const sidebarPlugin = createSidebarPlugin()
const { Sidebar } = sidebarPlugin

export default class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return (
      <div>
        <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={plugins}
        />
        <Sidebar />
      </div>
    );
  }
}
