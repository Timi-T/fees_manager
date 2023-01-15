import React from "react"
import './BigBtn.css'


const BigBtn = (props) => {
    return (
        <button type="submit" id="button" className="w-[200px] h-[35px] bg-[white] border-[0.5px] border-solid border-[purple] rounded-md" style={{color: props.color, backgroundColor: props.bcolor}} >{props.text}</button>
    )
}

export default BigBtn