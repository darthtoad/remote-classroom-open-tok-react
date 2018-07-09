import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from './../Constants.js';

export default class LogIn extends Component {
    state = {
        error: "",
        email: "",
        password: ""
    }

    logIn(event) {
        event.preventDefault();
        this.state.auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((() => {
                this.props.finishLogin();
            }))
            .catch(error => {
                this.setState({error: error});
            });
    }

    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        firebase.initializeApp(firebaseConfig);
        this.state.auth = firebase.auth();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.logIn}>
                    <input
                        value={this.state.email}
                        onChange={event => this.setState({email: event.target.value})}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        value={this.state.password}
                        onChange={event => this.setState({password: event.target.value})}
                        type="password"
                        placeholder="Password"
                    />
                    <button type="submit" value="Submit">
                        Sign In
                    </button>

                    { this.state.error && <p>{this.state.error.message}</p> }
                </form>
            </div>
        )
    }
}