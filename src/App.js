import React, { Component } from 'react';
import './App.css';
import LogIn from './components/LogIn';
import WordEntry from './components/WordEntry';
import SeeLists from './components/SeeLists';
import CreateSession from './components/CreateSession';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.finishLogin = this.finishLogin.bind(this);
    this.seeLists = this.seeLists.bind(this);
    this.goToCreateSession = this.goToCreateSession.bind(this);
  }

  state = {
    password: "",
    appState: 0
  }

  seeLists() {
    this.setState({appState: 3});
  }

  finishLogin() {
    this.setState({appState: 2});
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await fetch("https://server-gooymlnxuu.now.sh/" + this.state.password);
      let jsonResponse = await response.json();
      if (jsonResponse.message === "Password Correct") {
        this.setState({appState: 1});
      } else {
        alert("Password Incorrect");
      }
    } catch (error) {
      alert("Password Incorrect");
    }
  }

  handleChange(event) {
    this.setState({password: event.target.value});
  }

  goToCreateSession() {
    this.setState({appState: 4});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Remote Classroom Teacher's Site</h1>
        </header>
        {
          this.state.appState === 0 &&
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Please enter the password:
              <input type="text" value={this.state.password} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        }
        {
          this.state.appState === 1 && 
          <LogIn finishLogin={this.finishLogin}
          password={this.state.password}/>
        }
        {
          this.state.appState === 2 &&
          <WordEntry
            viewLists={this.seeLists}
            goToCreateSession={this.goToCreateSession}
          />
        }
        {
          this.state.appState === 3 &&
          <SeeLists
            addList={this.finishLogin}
          />
        }
        {
          this.state.appState === 4 &&
          <CreateSession
            viewLists={this.seeLists}
            addList={this.finishLogin}
          />
        }
      </div>
    );
  }
}

export default App;
