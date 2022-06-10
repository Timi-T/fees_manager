import React from 'react'
import { useState } from 'react'
import './searchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import PaneOption from '../paneOption/paneOption'


const SearchBar = (props) => {
    //Searchbar component

    const [inputValue, setinputValue] = useState("")
    const containsText = inputValue.length > 0
    var presentItems = []
    const handleChange = (event) => {
        setinputValue(event.target.value)
        const searcItems = document.getElementById("search-items")
        searcItems.style.display = "flex"
    }

    const ClearSearch = () => {
        setinputValue("")
    }

    if (containsText) {
        presentItems = props.items.filter((item) => {
            return (
                item.includes(inputValue)
            )
        })
    }

    return (
        <div id="search">
            <div id="search-container">
                <div id="search-box">
                    <input type="text" placeholder='Search' value={inputValue} onChange={handleChange} />
                    <div id="clear-search" onClick={ClearSearch}>
                        { containsText && <FontAwesomeIcon icon={faXmarkCircle} color="gray" /> }
                    </div>
                </div>
                <div id="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="whitesmoke" />
                </div>
            </div>
            <div id="search-items">
                {presentItems.map((item) => {
                    return (
                        <PaneOption key={item} name={item} />
                    )
                })}
            </div>
        </div>
    )
}

export default SearchBar