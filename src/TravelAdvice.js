import React from 'react';

const TravelAdvice = (props) => {
    return (
        <main>
            <ul>
            {
            props.displayedAdvice.map ( (suggestion) => {
                return (

                    <li key={suggestion.key}>
                        <p>Country: {suggestion.destination}</p>
                        <p>Advice: {suggestion.advice}</p>
                        <img src="" alt=""/>
                        <button onClick={ () => props.deleteAdvice (suggestion.key)}>Been there!</button>
                    </li>
                    
                )
            })
            }
            </ul>
        </main>
    )
}

export default TravelAdvice;