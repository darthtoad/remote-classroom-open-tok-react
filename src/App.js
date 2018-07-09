import React, { Component } from 'react';
import './App.css';
import { PASSWORD } from './Constants';
import LogIn from './components/LogIn';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.finishLogin = this.finishLogin.bind(this);
  }

  state = {
    password: "",
    appState: 0
  }

  finishLogin() {
    this.setState({appState: 2});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password === PASSWORD) {
      this.setState({appState: 1});
    }
  }

  handleChange(event) {
    this.setState({password: event.target.value});
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
          <LogIn finishLogin={this.finishLogin}/>
        }
        {
          this.state.appState === 2 &&
          <div>
            <p>Logged In</p>
          </div>
        }
      </div>
    );
  }
}

export default App;
