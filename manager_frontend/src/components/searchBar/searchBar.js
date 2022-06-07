import React from 'react'
import './searchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const SearchBar = () => {
    //Searchbar component
    return (
        <div id="search-container">
            <div id="search-box">
                <input type="text" placeholder='Search' />
                <FontAwesomeIcon icon={faXmarkCircle} color="gray" />
            </div>
            <div id="search-button">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="whitesmoke" />
            </div>
        </div>
    )
}

export default SearchBar