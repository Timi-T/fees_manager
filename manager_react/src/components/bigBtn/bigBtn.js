import React from "react"
import './bigBtn.css'


const BigBtn = (props) => {
    return (
        <div id="button" style={{color: props.color, backgroundColor: props.bcolor}} >{props.text}</div>
    )
}

export default BigBtn