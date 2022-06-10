import React from 'react'
import './optionsBars.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const OptionsBars = () => {
    //Hamburger sign to view options

    const ToggleSidePane = () => {
        const sidePane = document.getElementById("side-pane-container")
        const mainView = document.getElementById("main-view")
        const rightPane = document.getElementById("right-pane")
        const leftPane = document.getElementById("left-pane")
        if (sidePane.style.width !== "300px") {
            sidePane.style.width = "300px"
            mainView.style.opacity = "0.4"
            setTimeout(() => {
                rightPane.style.display = "flex"
                leftPane.style.display = "flex"
            }, 300)
        }
        else {
            sidePane.style.width = "0px"
            rightPane.style.display = "none"
            mainView.style.opacity = "1"
            setTimeout(() => {
                rightPane.style.display = "none"
                leftPane.style.display = "none"
            }, 200)
        }
    }
    return (
        <div id="options-container" onClick={ToggleSidePane}>
            <FontAwesomeIcon icon={faBars} size="lg" color="whitesmoke" />
        </div>
    )
}

export default OptionsBars