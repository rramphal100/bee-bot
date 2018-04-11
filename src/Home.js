import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            textInput: "",
            voiceInput: ""
        }
    }

  render() {
    return (
      <div className="home">
        <h1>Welcome to Watson Beebot</h1>
        <form onSubmit={this.handleTextSubmit}>
            <TextField
                hintText="Type your question..."
                style={{marginLeft: 20}}
                underlineShow={false}
                fullWidth={true}/>
            <button type="Submit">Submit</button>
        </form>
        <form onSubmit={this.handleVoiceSubmit}>

            <button type="Submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Home;
