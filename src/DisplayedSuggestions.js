import React, { Component } from 'react';

class DisplayedSuggestions extends Component {
    render() {
        return (
            <li>
                <p>Country: {this.props.travelTip}</p>
                <p>Advice: {this.props.travelAdvice}</p>
                <button>Been there!</button>
            </li>
        )
    }
}

export default DisplayedSuggestions;