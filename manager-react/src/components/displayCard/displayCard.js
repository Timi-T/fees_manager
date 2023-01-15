import './DisplayCard.css';
import BigBtn from '../BigBtn/BigBtn';
import React from 'react';


const DisplayCard = (props) => {
    return (
        <div id="card">
            <div id="top-card">
                <h2 id="card-name">{props.name}</h2>
            </div>
            <div id="bottom-card">
                <p id="card-description">{props.description}</p>
            </div>
        </div>
    )
}
//<BigBtn text={"View " + props.object} />

export default DisplayCard;
