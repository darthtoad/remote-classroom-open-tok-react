import React, { Component } from 'react';
import firebase from 'firebase';

export default class WordEntry extends Component {

    state = {
        wordList: [],
        word: '',
        listName: '',
        addImage: false,
        imageUrl: '',
        urlList: [],
        userId: null
    }

    addWord(event) {
        event.preventDefault();
        const newList = this.state.wordList;
        newList.push(this.state.word);
        this.setState({wordList: newList});
        this.setState({addImage: true});
    }

    addImageUrl(event) {
        event.preventDefault();
        const newList = this.state.urlList;
        newList.push(this.state.imageUrl);
        this.setState({urlList: newList});
        this.setState({addImage: false});
    }

    removeWord(event) {
        event.preventDefault();
        const newList = this.state.wordList;
        const index = newList.indexOf(event.target.id);
        newList.splice(index, 1);
        const newUrlList = this.state.urlList;
        newUrlList.splice(index, 1);
        this.setState({wordList: newList});
        this.setState({urlList: newUrlList});
    }

    handleChange(event) {
        this.setState({word: event.target.value});
    }

    handleUrlChange(event) {
        this.setState({imageUrl: event.target.value});
    }

    wordListNameChange(event) {
        this.setState({listName: event.target.value});
    }

    sendWordList(event) {
        event.preventDefault();
        if (this.state.listName === 'sessionIds') {
            alert("Not a valid list name");
        } else if (this.state.wordList !== [] && this.state.listName !== '') {
            firebase.database().ref('users/' + this.state.userId + '/' + this.state.listName).set({
                wordList: this.state.wordList,
                urlList: this.state.urlList
            });
            this.setState({word: ''});
            this.setState({wordList: []});
            this.setState({listName: ''});
            alert("List Added");
        } else {
            alert("Make sure to name your list and add words to it");
        }
    }

    constructor(props) {
        super(props);
        console.log("constructor init");
        this.addWord = this.addWord.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeWord = this.removeWord.bind(this);
        this.sendWordList = this.sendWordList.bind(this);
        this.wordListNameChange = this.wordListNameChange.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);
        this.addImageUrl = this.addImageUrl.bind(this);
    }

    componentDidMount() {
        console.log("component mounted");
        this.setState({userId: firebase.auth().currentUser.uid});
    }

    render() {
        return (
            <div>
                {!this.state.addImage ? <form onSubmit={this.addWord}>
                    <label>Please enter a word to add to your list: </label>
                    <input type="text" value={this.state.word} onChange={this.handleChange}></input>
                    <input type="submit" value="Add Word" />
                </form> : <form onSubmit={this.addImageUrl}>
                    <label>Please enter a url for {this.state.word}</label>
                    <input type="text" value={this.state.imageUrl} onChange={this.handleUrlChange}></input>
                    <input type="submit" value="Add Image Url" />
                </form>
                }
                <h3>Current Words:</h3>
                <p>Click to remove</p>
                {this.state.wordList.map(word => (
                    <p onClick={this.removeWord} id={word}>{word}</p>
                ))}
                <h4>Image Urls:</h4>
                {this.state.urlList.map(url => (
                    <p>{url}</p>
                ))}
                <form>
                    <label>Name of List: </label>
                    <input type="text" value={this.state.listName} onChange={this.wordListNameChange}></input>
                </form>
                <form onSubmit={this.sendWordList}>
                    <input type="submit" value="Send Word List" />
                </form>
                <button onClick={this.props.viewLists}>See Lists</button>
                <button onClick={this.props.goToCreateSession}>Create Session</button>
            </div>
        )
    }
}