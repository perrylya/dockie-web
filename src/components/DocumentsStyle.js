import React from 'react';
import Documents from './Documents';

export default class DocumentsStyle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Documents redirect={this.redirect}/>
        <button onclick="document.getElementById('id01').style.display='block'">Sign Up</button>

        <div id="id01" class="modal">
            <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal"></span>
            <form class="modal-content" action="/action_page.php">
              <div class="container">
                <hr/>
                <label>hi</label>
                <input type="text" placeholder="Enter Email" name="email" required/>
              </div>
              <div class="clearfix">
                <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                <button type="submit" class="signup">Sign Up</button>
              </div>
            </form>
          </div>
      </div>
    )
  }
}
