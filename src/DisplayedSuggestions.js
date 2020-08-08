import React, { Component } from 'react';

class DisplayedSuggestions extends Component {
    render() {
        return (
            <li>
                <p>{this.props.travelTip}</p>
            </li>
        )
    }
}

export default DisplayedSuggestions;