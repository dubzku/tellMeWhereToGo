import React, { Component } from 'react';
// import axios from 'axios';
import firebase from './firebase';
import Form from './Form';
import TravelAdvice from './TravelAdvice'
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
      suggestions: [],
      photo: []
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

    // // API CALL
    // axios({
    //   url: `https://www.rijksmuseum.nl/api/en/collection`,
    //   method: `GET`,
    //   responseType: `json`,
    //   params: {
    //     key: `m6u9SwrU`,
    //     format: `json`,
    //     hasImage: true,
    //     ps: 1,
    //     q: event.target.value
    //   }
    // })
    // .then((response) => {
    //   console.log(response);
    //   this.setState({
    //     photo: response
    //   });
    // })
  // }

  deleteSuggestion = (suggestion) => {
    const dbRef = firebase.database().ref();
    dbRef.child(suggestion).remove();
  }

  render () {
    return (
      <div className="App wrapper">

        <Form 
        userSubmit={ this.buttonSubmit } 
        />

        <TravelAdvice 
        displayedAdvice= {this.state.suggestions} 
        deleteAdvice= { this.deleteSuggestion } 
        />

      </div>
    );
  }
}

export default App;
