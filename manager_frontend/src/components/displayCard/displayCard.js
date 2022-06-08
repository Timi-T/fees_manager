import React from 'react'
import BigBtn from '../bigBtn/bigBtn'
import './displayCard.css'


const DisplayCard = (props) => {
    return (
        <div id="card">
            <h2 id="card-name">{props.name}</h2>
            <p id="card-description">{props.description}</p>
            <BigBtn text={"View " + props.object} />
        </div>
    )
}

export default DisplayCard