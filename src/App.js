import React, { Component } from "react";
import axios from "axios";
import firebase from "./firebase";
import TravelAdvice from "./TravelAdvice"
import Footer from "./Footer";
import paperPlane from "./assets/origami.png";
import "./App.css";


class App extends Component {
    // Lifecycle Step #1 - Constructor runs first - set the initial properties (ie state) on the component
    constructor() {
        super();
        this.state = {
        userInputDestination: "",
        userInputAdvice: "",
        suggestions: [],
        destinationPhoto: ""
        }
    }

    // Lifecycle Step #3 - componentDidMount() runs third, after the constructor and render have run
    componentDidMount () {
        const dbRef = firebase.database().ref();

        // pulling in data from Firebase and setting it to state 
        dbRef.on("value", (snapshot) => {
            const data = snapshot.val();

            const newSuggestions = [];

            for (let key in data) {
                newSuggestions.push({
                key: key,
                destination: data[key].destination,
                advice: data[key].advice,
                photo: data[key].photo
                });
            }

            this.setState({
                suggestions: newSuggestions
            })
        })
    }

    // Event Listener for when user types in the text input/textarea fields; set the state for userInputDestination and userInputAdvice to be whatever the user typed
    handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
    }

    // on button submit: 
        // (1) prevent default
        // (2) error handling for if the user did not fill in both fields 
        // (3) make API/axios call to Pexels API using userInputDestination as the query 
        // (4) set destinationPhoto in state to be the url for the image returned from the API 
        // (5) push userInputDestination, userInputAdvice, and destinationPhoto from state to Firebase
        // (6) set state for userInputDestination and userInputAdvice back to an empty string
    buttonSubmit = (event) => {
        event.preventDefault();

        const dbRef = firebase.database().ref();

        const apiKey = `563492ad6f917000010000017a8698fdc0aa4677b4cda27aa4991d1a`;

        !document.getElementById("destination").value || !document.getElementById("advice").value
        ? alert("Please fill in both fields!")
        : axios({
            url: `https://api.pexels.com/v1/search`,
            method: `GET`,
            responseType: `json`,
            params: {
                dataType: `json`,
                per_page: 1,
                query: `${this.state.userInputDestination}`
            },
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        })
        .then ((response) => {
            this.setState({
                destinationPhoto: response.data.photos[0].src.small
            });

            dbRef.push({
                destination: this.state.userInputDestination,
                advice: this.state.userInputAdvice,
                photo: this.state.destinationPhoto
            });

            this.setState({
                userInputDestination: "",
                userInputAdvice: ""
            });
        })
        .catch((error) => {
            alert("Sorry, we can't find that place!")
        });
    }
    
    // Event Listener to delete the travel suggestion on button click 
    deleteSuggestion = (suggestion) => {
        const dbRef = firebase.database().ref();
        dbRef.child(suggestion).remove();
    }

    // Lifecycle Step #2 - Render method will run after the constructor; returns JSX to be displayed on page
    render () {
        return (
            <div className="App">
                <header>
                    <div className="wrapper">
                        <h1>Tell Me <span className="logoColour">Where</span> To Go</h1>
                        <div className="logoImageContainer">
                            <img src={paperPlane} alt="paper plane icon from Eight Black Dots"/>
                        </div>
                        <form action="">
                            <label htmlFor="destination">Where should I go?</label>
                            <input onChange={this.handleChange} value={this.state.userInputDestination} type="text" id="destination" name="userInputDestination" minLength="2" maxLength="15" placeholder="Enter a country / city" />

                            <label htmlFor="advice">What should I do there?</label>
                            <textarea onChange={this.handleChange} value={this.state.userInputAdvice} type="text" id="advice" name="userInputAdvice" minLength="5" maxLength="60" placeholder="Sites to see, foods to try, etc." />

                            <button onClick={ this.buttonSubmit } className="submitButton">Post it!</button>
                        </form>
                    </div>
                </header>

                <TravelAdvice 
                displayedAdvice= {this.state.suggestions} 
                deleteAdvice= { this.deleteSuggestion } 
                />

                <Footer />

            </div>
    );
}
}

export default App;




