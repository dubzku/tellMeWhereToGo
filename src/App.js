import React, { Component } from 'react';
// import axios from 'axios';
import firebase from './firebase';
import './App.css';

// PSEUDOCODE for MVPs
// User comes to the landing page, and sees 2 inputs: 
  // (1) Enter the name of a place you would recommend travelling to
  // (2) Enter a suggestion of something to do at that place
// User types their answer in both fields, and hits Submit
// The data is stored in Firebase object
// Data is pulled from Firebase, and displayed on the page 


class App extends Component {
  constructor() {
    super();
    this.state = {
      userInputDestination: '',
      userInputAdvice: '',
      suggestions: []
    }
  }

  componentDidMount () {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();

      const newSuggestions = [];

      for (let key in data) {
        newSuggestions.push({
          key: key,
          destination: data[key].destination,
          advice: data[key].advice
        });
      }

      this.setState({
        suggestions: newSuggestions
      })
    })
  }

  // onChange event handler for when user types their destination
  handleChangeDestination = (event) => {
    this.setState({
      userInputDestination: event.target.value
    })
  }

  // onChange event handler for when user types their travel advice
  handleChangeAdvice = (event) => {
    this.setState({
      userInputAdvice: event.target.value
    })
  }

  // onClick event for when user clicks Submit button 
  buttonSubmit = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();

    dbRef.push({
      destination: this.state.userInputDestination,
      advice: this.state.userInputAdvice
    });

    this.setState({
      userInputDestination: "",
      userInputAdvice: ""
    })
  }

  deleteSuggestion = (suggestion) => {
    const dbRef = firebase.database().ref();
    dbRef.child(suggestion).remove();
  }


  render () {
    return (
      <div className="App">
        <h1>Tell Me Where To Travel</h1>

        <form action="">
          <label htmlFor="destination">Where should I go?</label>
          <input onChange={this.handleChangeDestination} value={this.state.userInputDestination} type="text" id="destination" />

          <label htmlFor="advice">What should I do there?</label>
          <input onChange={this.handleChangeAdvice} value={this.state.userInputAdvice} type="text" id="advice" />

          <button onClick={this.buttonSubmit}>Submit</button>
        </form>
        <ul>
          {
            this.state.suggestions.map ( (suggestion) => {
            return (
              <li key={suggestion.key}>
                <p>Country: {suggestion.destination}</p>
                <p>Advice: {suggestion.advice}</p>
                <button onClick={ () => this.deleteSuggestion(suggestion.key)}>Been there!</button>
              </li>
            )
          })
          }
        </ul>
      </div>
    );
  }
}

export default App;
