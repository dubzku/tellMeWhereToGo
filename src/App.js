import React, { Component } from 'react';
// import axios from 'axios';
import firebase from './firebase';
import './App.css';
import DisplayedSuggestions from './DisplayedSuggestions';

// Pseudocode for MVPs

// What does the app do? 
  // User comes to the landing page, and sees 2 inputs: (1) Enter the name of a country/city you would recommend travelling to (2) Enter a travel suggestion for that place
  // User enters their travel tip, and presses submit
// The data is stored in Firebase object
// Data is pulled from Firebase, and displayed on the page 


class App extends Component {
  constructor() {
    super();
    this.state = {
      userInputCountry: "",
      userInputAdvice: "",
      suggestions: []
    }
  }

  componentDidMount () {

    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log('snapshot data', data);

      const newArray = [];

      for (let key in data) {
        newArray.push({
          key: key,
          country: data[key].country,
          advice: data[key].advice
        });
      }

      console.log("newArray", newArray);

      this.setState({
        suggestions: newArray
      })

    })
  }

  handleChangeCountry = (event) => {
    this.setState({
      userInputCountry: event.target.value
    }, () => {
      console.log(this.state.userInputCountry);
    })
  }

  handleChangeAdvice = (event) => {
    this.setState({
      userInputAdvice: event.target.value
    }, () => {
      console.log(this.state.userInputAdvice);
    })
  }

  handleClick = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();

    console.log("dbRef", dbRef);

    dbRef.push({
      country: this.state.userInputCountry,
      advice: this.state.userInputAdvice
    });

    this.setState({
      userInputCountry: "",
      userInputAdvice: ""
    })
  }

  deleteSuggestion = (suggestion) => {
    console.log(suggestion);
    const dbRef = firebase.database().ref();
    dbRef.child(suggestion).remove();

  }


  render () {
    return (
      <div className="App">
        <h1>Tell Me Where To Travel</h1>
        <form action="">
          <label htmlFor="destination">Country:</label>
          <input onChange={this.handleChangeCountry} value={this.state.userInputCountry} type="text" id="destination" />
          <label htmlFor="travelTip">Advice:</label>
          <input onChange={this.handleChangeAdvice} value={this.state.userInputAdvice} type="text" id="travelTip" />
          <button onClick={this.handleClick}>Add Reco</button>
        </form>
        <ul>
          {
            this.state.suggestions.map ( (suggestion, index) => {
            return (
              
              <DisplayedSuggestions 
              travelTip={suggestion.country} 
              travelAdvice={suggestion.advice}
              key={index} 
              suggestionRemoval = {() => this.deleteSuggestion(index)}
              />

            )
            })
          }
        </ul>
        

          

        
      </div>
    );
  }
}

export default App;
