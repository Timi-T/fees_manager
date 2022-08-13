import React from 'react'
import './pageLayout.css'
import SidePane from '../sidePane/sidePane'
import MainView from '../mainView/mainView'
import ProfileDropdown from '../profileDropdown/profileDropdown'


const PageLayout = (props) => {
    return (
        <div id="section-below-header">
            <SidePane />
            <MainView display={props.display} />
            <ProfileDropdown />
        </div>
    )
}

export default PageLayout