import React, { Component } from 'react';
import firebase from 'firebase';

export default class CreateSession extends Component {
    state = {
        sessionName: "",
        sessionId: "",
        allSessions: []
    }

    async newSession(event) {
        event.preventDefault();
        let response = await fetch("https://server-glcucdwubw.now.sh/session");
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        this.setState({sessionId: jsonResponse.sessionId});
        firebase.database().ref('sessionIds/').push({
            sessionName: this.state.sessionName,
            sessionId: this.state.sessionId
        });
        alert("Your session " + this.state.sessionName + " has been added");
        let newSessionList = this.state.allSessions;
        newSessionList.push(this.state.sessionName);
        this.setState({allSessions: newSessionList});
        this.setState({sessionName: ''});
        this.setState({sessionId: ''});
    }

    handleSessionChange(event) {
        this.setState({sessionName: event.target.value});
    }

    async deleteSession(event) {
        event.preventDefault();
        let wordToDelete = event.target.id;
        await firebase.database().ref('/sessionIds/'
    ).once('value').then((snapshot) => {
            snapshot.forEach(child => {
                if (child.child('sessionName').val() === wordToDelete) {
                    firebase.database().ref('/sessionIds/' + child.key).remove();
                    let newSessionList = this.state.allSessions;
                    newSessionList.splice(newSessionList.indexOf(wordToDelete), 1);
                    this.setState({allSessions: newSessionList});
                }
            })
        })
    }

    constructor(props) {
        super(props);
        this.newSession = this.newSession.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
        this.handleSessionChange = this.handleSessionChange.bind(this);
    }

    async componentDidMount() {
        let sessions = [];
        await firebase.database().ref('/sessionIds/'
    ).once('value').then(function(snapshot){
            snapshot.forEach(child => {
                console.log(child.child('sessionName').val());
                sessions.push(child.child('sessionName').val());
            })
        })
        this.setState({allSessions: sessions});
        console.log(this.state.allSessions);
    }

    render() {
        return (
            <div>
                <h3>Add Sessions</h3>
                <h5>Make sure to make a new session name for every meeting for best performance</h5>
                <form onSubmit={this.newSession}>
                    <label>Please add a name for your session</label>
                    <input type="text" value={this.state.sessionName} onChange={this.handleSessionChange}></input>
                    <input type="submit" value="Add session"></input>
                </form>
                <p>New Session Names: </p>
                {this.state.allSessions.map(name => {
                    return <p onClick={this.deleteSession} id={name}>{name}</p>
                })}
                <button onClick={this.props.viewLists}>View Lists</button>
                <button onClick={this.props.addList}>Add Lists</button>
            </div>
        )
    }
}