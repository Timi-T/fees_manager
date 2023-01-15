import React from 'react'
import './sidePane.css'
import PaneOption from '../PaneOption/PaneOption'
import IconOption from '../iconOption/iconOption'
import { faBuildingColumns, faUsersViewfinder, faUsers, faMoneyCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'



const SidePane = () => {
    const navigate = useNavigate()
    return (
        <div id="side-pane-container">
            <div id="left-pane">
                <div id="side-options-container">
                    <IconOption iconName={faBuildingColumns} />
                    <IconOption iconName={faUsersViewfinder} />
                    <IconOption iconName={faUsers} />
                    <IconOption iconName={faMoneyCheck} />
                </div>
            </div>
            <div id="right-pane">
                <div id="side-options-container">
                    <div className="pane-option" >
                        <a href='/schools'><PaneOption name={"Schools"} /></a>
                    </div>
                    <div className="pane-option" >
                        <a href='/classrooms'><PaneOption name={"Classrooms"} /></a>
                    </div>
                    <div className="pane-option">
                        <a href='/students'><PaneOption name={"Students"} /></a>
                    </div>
                    <div className="pane-option" >
                        <a href='/payments'><PaneOption name={"Payments"} /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidePane