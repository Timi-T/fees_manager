import React from 'react'
import BigBtn from '../bigBtn/bigBtn'
import './displayCard.css'


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

export default DisplayCard