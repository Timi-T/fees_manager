import React from "react"
import './bigBtn.css'


const BigBtn = (props) => {
    return (
        <button type="submit" id="button" style={{color: props.color, backgroundColor: props.bcolor}} >{props.text}</button>
    )
}

export default BigBtn