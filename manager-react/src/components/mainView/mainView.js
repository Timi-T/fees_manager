import React from "react"
import MainDisplay from "../mainDisplay/mainDisplay"
import DisplayMessage from '../displayMessage/displayMessage';
//import PageAside from "../pageAside/pageASide"
//import PaneOption from "../paneOption/paneOption"
//import ScrollBox from "../scrollBox/scrollBox"
import './mainView.css'


const MainView = (props) => {

    const CloseOtherViews = () => {
        const sidePane = document.getElementById("side-pane-container")
        const rightPane = document.getElementById("right-pane")
        const leftPane = document.getElementById("left-pane")
        const dropdown = document.getElementById("profile-dropdown-container")
        const mainView = document.getElementById("main-view")
        const rightProfile = document.getElementById("right-profile")
        const leftProfile = document.getElementById("left-profile")
        dropdown.style.height = "0px"
        setTimeout(() => {
            rightProfile.style.display = "none"
            leftProfile.style.display = "none"
        }, 100)
        if (sidePane.style.width !== "0px") {
            sidePane.style.width = "0px"
            mainView.style.opacity = "1"
            setTimeout(() => {
                rightPane.style.display = "none"
                leftPane.style.display = "none"
            }, 200)
        }
    }
    //<PageAside title={"Students"} content={<ScrollBox widgets={[<PaneOption key={"ope"} name="Ogunbode opeyemi" bcolor="whitesmoke" color="rgb(60, 7, 60)" />]} /> } />
    return (
        <div>
            <div id="main-view" onClick={CloseOtherViews}>
                <MainDisplay display={props.display} />
            </div>
        </div>
    )
}

export default MainView