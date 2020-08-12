import React, { Component } from 'react';
import firebase from './firebase';
import axios from 'axios';

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

      !document.getElementById('destination').value || !document.getElementById('advice').value
      ? alert('Please fill in both fields!')
      : dbRef.push({
        destination: this.state.userInputDestination,
        advice: this.state.userInputAdvice
      });
      
      this.setState({
        userInputDestination: "",
        userInputAdvice: ""
      })

      function getData() {
        const apiKey = `563492ad6f917000010000017a8698fdc0aa4677b4cda27aa4991d1a`;

        axios({
          url: `https://api.pexels.com/v1/search`,
          method: `GET`,
          responseType: `json`,
          params: {
            dataType: `json`,
            query: `apple`
          },
          headers: {
            Authorization: `Bearer ${apiKey}`
          }
        }).then ((data) => {
          console.log(data);

        });



//         const apiData = axios.get('https://api.pexels.com/v1/search', {
//             params: {
//                 dataType: 'json',
//             },
//             {
//              headers: {
//                 'Authorization': `Bearer ${apiKey}`
//              }
//             }
//         }).then((data) =>{
//             console.log(data);
//         })
//  }
  
}
getData();
}


    render() {
        return(
            <header>
                <h1>Tell Me Where To Travel</h1>
                <form action="">
                    <label htmlFor="destination">Where should I go?</label>
                    <input onChange={this.handleChange} value={this.state.userInputDestination} type="text" id="destination" name="userInputDestination" minLength="2" maxLength="50" />

                    <label htmlFor="advice">What should I do there?</label>
                    <textarea onChange={this.handleChange} value={this.state.userInputAdvice} type="text" id="advice" name="userInputAdvice" minLength="5" maxLength="200" />

                    <button onClick={ this.buttonSubmit }>Submit</button>

                    <img src="" alt=""/>
                </form>
            </header>
        )
    }
}

export default Form;