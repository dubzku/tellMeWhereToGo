import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';
import DisplayedSuggestions from './DisplayedSuggestions';

// Pseudocode


class App extends Component {
  constructor() {
    super();
    this.state = {
      suggestions: []
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      const newArray = [];

      for (let propName in data) {
        newArray.push( data[propName]);
      }

      console.log(newArray);

      this.setState({
        suggestions: newArray
      })

    })
  }



  render () {
    return (
      <div className="App">
        <h1>Tell Me Where To Travel</h1>
        <ul>
          {
            this.state.suggestions.map ( (suggestion, index) => {
            return <DisplayedSuggestions travelTip={suggestion} key={index} />
            })
          }

        </ul>
      </div>
    );
  }
}

export default App;
