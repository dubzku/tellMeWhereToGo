import React from 'react';

const TravelAdvice = (props) => {
    return (
        <main>
            <ul className="container">
                {
                props.displayedAdvice.map ( (suggestion) => {
                    return (
                        <li key={suggestion.key}>
                            <h2>{suggestion.destination}</h2>
                            <p>{suggestion.advice}</p>
                            <img src="" alt=""/>
                            <button onClick={ () => props.deleteAdvice (suggestion.key) }>Been there!</button>
                        </li>
                    )
                })
                }
            </ul>
        </main>
    )
}

export default TravelAdvice;