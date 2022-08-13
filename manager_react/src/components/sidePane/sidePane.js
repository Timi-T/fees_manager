import React from 'react'
import './sidePane.css'
import PaneOption from '../paneOption/paneOption'
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
                    <div className="pane-option" onClick={() => {
                        navigate("/schools");
                    }}>
                        <PaneOption name={"Schools"} />
                    </div>
                    <div className="pane-option" onClick={() => {
                        navigate("/classrooms");
                    }}>
                        <PaneOption name={"Classrooms"} />
                    </div>
                    <div className="pane-option" onClick={() => {
                        navigate("/students");
                    }}>
                        <PaneOption name={"Students"} />
                    </div>
                    <div className="pane-option" onClick={() => {
                        navigate("/payments");
                    }}>
                        <PaneOption name={"Payments"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidePane