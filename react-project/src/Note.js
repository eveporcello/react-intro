import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Note extends Component {
    constructor() {
        super();
        this.state = {
            editing: false
        };
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.randomBetween = this.randomBetween.bind(this);
    }
    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
            transform: 'rotate(' + this.randomBetween(-15, 15, 'deg') + ')'
            // transform: rotate(6deg)
        };
    }
    randomBetween(x, y, u) {
        return ((x+ Math.ceil(Math.random() * y)) -1) + u;
    }
    edit() {
        this.setState({editing: true});
    }

    save() {
        var val = ReactDOM.findDOMNode(this.refs.newText).value;
        this.props.onChange(val, this.props.index);
        this.setState({editing: false});
    }

    remove() {
        this.props.onRemove(this.props.index);
    }

    renderForm() {
        return (
            <div className="note"
                 style={this.style}>
                <textarea defaultValue={this.props.children} ref="newText"></textarea>
          <span>
            <button onClick={this.save}>Save</button>
          </span>
            </div>
        );
    }

    renderDisplay() {
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
          <span>
            <button onClick={this.edit}>Edit</button>
            <button onClick={this.remove}>Remove</button>
          </span>
            </div>
        )
    }

    render() {
        return (this.state.editing) ? this.renderForm() : this.renderDisplay();
    }
}

export default Note;
