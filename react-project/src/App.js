import React, { Component } from 'react';
import './App.css';
import Note from './Note'
import $ from 'jquery'

class App extends Component {
    constructor() {
        super();
        this.state = {
            notes: []
        };
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.eachNote = this.eachNote.bind(this);
        this.nextId = this.nextId.bind(this);
    }
    componentWillMount() {
        var self = this;
        if(this.props.count) {
            $.getJSON('http://baconipsum.com/api/?type=all-meat&sentences=' + this.props.count +
                "&start-with-lorem=1&callback=?",
                function(results) {
                            results[0].split('. ').forEach(function(sentence) {
                                self.add(sentence.substring(0, 40));
                            });
            });
        }
    }
    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }
    add(text) {
        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({notes: arr});
    }
    update(newText, i) {
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({notes: arr});
    }
    remove(i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({notes: arr});
    }
    eachNote(note, i) {
        return <Note key={note.id}
                     index={i}
                     onChange={this.update}
                     onRemove={this.remove}>{note.note}</Note>
    }
    render() {
        return <div className="board">
           {this.state.notes.map(this.eachNote)}
           <button onClick={this.add.bind(null, "New Note")}>ADD</button>
        </div>
    }
}
export default App;
