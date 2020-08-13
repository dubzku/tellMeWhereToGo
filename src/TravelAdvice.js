import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const TravelAdvice = (props) => {
    return (
        <main>
            <div className="wrapper">
                <ul className="postItContainer">
                    {
                    props.displayedAdvice.map ( (suggestion) => {
                        return (
                            <li key={suggestion.key} className="postItNotes">
                                
                                    <h2>{suggestion.destination}</h2>
                                    <p>{suggestion.advice}</p>
                                    <div className="imageContainer">
                                        <img src={suggestion.photo} alt={`Photograph of ${suggestion.destination}, taken by ${suggestion.photographerName}`}/>
                                    </div>
                                    <button onClick={ () => props.deleteAdvice (suggestion.key) } className="deletePostIt"><FontAwesomeIcon icon={faTimes} /></button>
                                
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        </main>
    )
}

export default TravelAdvice;