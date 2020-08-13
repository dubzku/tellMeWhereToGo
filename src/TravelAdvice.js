import React from 'react';

const TravelAdvice = (props) => {
    return (
        <main>
            <div className="wrapper">
                <ul className="container">
                    {
                    props.displayedAdvice.map ( (suggestion) => {
                        return (
                            <li key={suggestion.key}>
                                
                                    <h2>{suggestion.destination}</h2>
                                    <p>{suggestion.advice}</p>
                                    <div className="imageContainer">
                                        <img src={suggestion.photo} alt={suggestion.destination}/>
                                    </div>
                                    <button onClick={ () => props.deleteAdvice (suggestion.key) } className="deletePostIt">X</button>
                                
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