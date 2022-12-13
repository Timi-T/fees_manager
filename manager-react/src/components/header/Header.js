import React from 'react'
import './header.css'
import SearchBar from '../searchBar/searchBar'
import ProfileIcon from '../profileIcon/profileIcon'
import AppLogo from './applogo/appLogo'
import OptionsBars from '../optionsBars/optionsBars'
import { useState, useEffect } from 'react'

const Header = () => {
    //Entire page header
    const [currentSch, setCurrentSch] = useState(localStorage.getItem('currentSchool'));
    return (
        <header id="header-container">
            <OptionsBars />
            <AppLogo school={currentSch} />
            <SearchBar />
            <ProfileIcon />
        </header>
    )
}

export default Header