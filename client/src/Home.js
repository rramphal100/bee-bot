import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ReactMic } from 'react-mic';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            textInput: "",
            voiceInput: "",
            answerText: "",
            answerAudio: "",
            record: false
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
        this.handleAudioSubmit = this.handleAudioSubmit.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.onStop = this.onStop.bind(this);
    }

    handleTextChange(e) {
        this.setState({textInput: e.target.value})
    }

    handleTextSubmit(e) {
        e.preventDefault();
        axios.post("/question/", {type: "text", input: this.state.textInput}).then(response => {
            this.setState({
                textInput: "",
                voiceInput: "",
                record: false,
                textAnswer: response.data,
                answerAudio: ""
            })
        });
    }

    handleAudioSubmit(e) {
        e.preventDefault();
        console.log(this.state.voiceInput);
        // axios.post("https://api.cloudconvert.com/convert", {
        //     "apikey": "LgbWsqhPgG6d3zoeFVtoqjlD2ekx1t36vShLjKWPquezbd3U1CQxHllIMWAf3iosKBOp6yRF2oWGssAZa77PDw",
        //     "inputformat": "webm",
        //     "outputformat": "flac",
        //     "input": "upload",
        //     "wait": true,
        //     "file": this.state.voiceInput.blob
        // }).then(response => {
        //     console.log(response.data);
        //     axios.post("/question/", {type: "audio", input: response.data}).then(response => {
        //         this.setState({
        //             textInput: "",
        //             voiceInput: "",
        //             record: false,
        //             answerAudio: "",
        //             textAnswer: ""
        //         })
        //     });
        // })
        axios.post("/question/", {type: "audio", input: this.state.voiceInput}).then(response => {
            this.setState({
                textInput: "",
                voiceInput: "",
                record: false,
                answerAudio: "",
                textAnswer: ""
            })
        });
    }

    startRecording() {
        this.setState({
            record: true
        });
    }

    stopRecording() {
        this.setState({
            record: false
        });
    }

    onStop(recordedAudio) {
        console.log('chunk of real-time data is: ', recordedAudio);
        this.setState({voiceInput: recordedAudio})
    }

  render() {
      const buttonStyle = {margin: "20px auto", display: "block", width: "200px"}
    return (
      <div className="home">
          <div className="container">
        <h1>Welcome to Watson BeeBot</h1>
        <form onSubmit={this.handleTextSubmit}>
            <TextField
                hintText="Type your question..."
                style={{marginLeft: 20, fontSize: "20px"}}
                underlineShow={false}
                fullWidth={true}
                value={this.state.textInput}
                onChange={this.handleTextChange}/>
            <RaisedButton type="submit" style={buttonStyle}>Submit</RaisedButton>
        </form>
        <h3>OR</h3>
        <h4>Record your question...</h4>
        <form onSubmit={this.handleAudioSubmit}>
            <ReactMic
              record={this.state.record}
              onStop={this.onStop}
              strokeColor="#000000"
              backgroundColor="#FFFFFF"
              className="soundWave"/>
            {this.state.record ?
                <RaisedButton onTouchTap={this.stopRecording} onClick={this.stopRecording} style={buttonStyle} className="button">Stop</RaisedButton>
                :
                <RaisedButton onTouchTap={this.startRecording} onClick={this.startRecording} style={buttonStyle} className="button">Start</RaisedButton>
            }
            <RaisedButton type="submit" style={buttonStyle}>Submit</RaisedButton>
        </form>
        {this.state.answerText !== "" &&
            <div className="answer">
                <h2>Answer:</h2>
                <p className="answerText">{this.state.answerText}</p>
            </div>
        }
        {this.state.answerAudio !== "" &&
            <div className="answer">
                <h2>Answer:</h2>
                    <audio controls autoplay>
                      <source src={this.state.answerAudio} type="audio/ogg"/>
                    Your browser does not support the audio element.
                    </audio>
            </div>
        }
        </div>
      </div>
    );
  }
}

export default Home;
