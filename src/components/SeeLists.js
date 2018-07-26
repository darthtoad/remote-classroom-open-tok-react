import React, { Component } from 'react';
import firebase from 'firebase';

export default class SeeLists extends Component {
    state = {
        listNames: [],
        wordList: [],
        currentList: ''
    }

    async reset() {
        let lists = [];
        let names = [];
        await firebase.database().ref('/users/' + firebase.auth().currentUser.uid
    ).once('value').then(function(snapshot){
            let snapVal = snapshot.val();
            console.log(snapVal);
            for (let inner in snapVal) {
                names.push(inner);
            }
        })
        this.setState({listNames: names});
        this.setState({wordLists: lists});
        console.log(this.state.wordLists)
        this.setState({currentList: ''});
    }

    constructor(props) {
        super(props);
        this.seeValues = this.seeValues.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    componentDidMount() {
        this.reset();
    }

    seeValues(event) {
        event.preventDefault();
        console.log(event.target.id);
        this.setState({currentList: event.target.id});
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/' + event.target.id
    ).once('value').then((snapshot) => {
            let snapVal = snapshot.val();
            console.log(snapVal.wordList);
            this.setState({wordList: snapVal.wordList});
        })
    }

    deleteList() {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/' + this.state.currentList).remove();
        this.reset();
    }

    render() {
        return (
            <div>
                {
                    this.state.listNames.map(name => {
                        console.log(name);
                        return (
                            <p onClick={this.seeValues} id={name}>{name}</p>
                        )
                    }
                )}
                {
                    this.state.currentList !== '' &&
                    <h3>Current List: {this.state.currentList}</h3>
                }

                {
                    this.state.wordList.map(word => {
                        return (<p>{word}</p>)
                    })
                }

                {
                    this.state.currentList !== '' &&
                    <button onClick={this.deleteList}>Delete List</button>
                }

                <button onClick={this.props.addList}>Add More Lists</button>
            </div>
        )
    }
}