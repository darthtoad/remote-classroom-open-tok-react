import React, { Component } from 'react';
import firebase from 'firebase';

export default class SeeLists extends Component {
    state = {
        wordLists: []
    }

    componentDidMount() {
        console.log("SeeLists mounting");
        let lists = [];
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid
    ).once('value').then(function(snapshot){
            lists.push(snapshot.val());
        })
        this.setState({wordLists: lists});
    }

    render() {
        return (
            <div>
                {this.state.wordLists.map(list => (
                    <p>{list.toString()}</p>
                ))}
                <button onClick={this.props.addList}>Add More Lists</button>
            </div>
        )
    }
}