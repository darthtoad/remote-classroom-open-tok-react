import React, { Component } from 'react';

export default class WordEntry extends Component {

    state = {
        wordList: [],
        word: ''
    }

    addWord(event) {
        event.preventDefault();
        const newList = this.state.wordList;
        newList.push(this.state.word);
        this.setState({wordList: newList});
    }

    removeWord(event) {
        event.preventDefault();
        const newList = this.state.wordList;
        const index = newList.indexOf(event.target.id);
        newList.splice(index, 1);
        this.setState({wordList: newList});
    }

    handleChange(event) {
        this.setState({word: event.target.value});
    }

    constructor(props) {
        super(props);
        this.addWord = this.addWord.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeWord = this.removeWord.bind(this);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addWord}>
                    <label>Please enter a word to add to your list: </label>
                    <input type="text" value={this.state.word} onChange={this.handleChange}></input>
                    <input type="submit" value="Add Word" />
                </form>
                <p>{this.state.word}</p>
                <h3>Current Words:</h3>
                {this.state.wordList.map(word => (
                    <p onClick={this.removeWord} id={word}>{word}</p>
                ))}
            </div>
        )
    }
}