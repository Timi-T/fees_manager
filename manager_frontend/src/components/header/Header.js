import React from 'react'
import './header.css'
import SearchBar from '../searchBar/searchBar'
import ProfileIcon from '../profileIcon/profileIcon'
import AppLogo from '../applogo/appLogo'
import OptionsBars from '../optionsBars/optionsBars'


const Header = () => {
    //Entire page header
    return (
        <header id="header-container">
            <OptionsBars />
            <AppLogo />
            <SearchBar />
            <ProfileIcon />
        </header>
    )
}

export default Header