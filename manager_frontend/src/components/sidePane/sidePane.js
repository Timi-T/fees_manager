import React from 'react'
import './sidePane.css'
import PaneOption from '../paneOption/paneOption'
import IconOption from '../iconOption/iconOption'
import { faBuildingColumns, faUsersViewfinder, faUsers, faMoneyCheck } from '@fortawesome/free-solid-svg-icons'



const SidePane = () => {
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
                    <PaneOption name={"Schools"} />
                    <PaneOption name={"Classrooms"} />
                    <PaneOption name={"Student"} />
                    <PaneOption name={"Payments"} />
                </div>
            </div>
        </div>
    )
}

export default SidePane