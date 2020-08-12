import React, { Component } from 'react';
import firebase from './firebase';

class Form extends Component {
    constructor () {
        super();
        this.state = {
            userInputDestination: '',
            userInputAdvice: '',
        }
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

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

    render() {
        return(
            <header>
                <h1>Tell Me Where To Travel</h1>
                <form action="">
                    <label htmlFor="destination">Where should I go?</label>
                    <input onChange={this.handleChange} value={this.state.userInputDestination} type="text" id="destination" name="userInputDestination" />

                    <label htmlFor="advice">What should I do there?</label>
                    <input onChange={this.handleChange} value={this.state.userInputAdvice} type="text" id="advice" name="userInputAdvice" />

                    <button onClick={ this.buttonSubmit }>Submit</button>
                </form>
            </header>
        )
    }
}

export default Form;