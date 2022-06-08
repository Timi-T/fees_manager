import React from 'react'
import { useState } from 'react'
import './searchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import PaneOption from '../paneOption/paneOption'


const SearchBar = (props) => {
    //Searchbar component

    //const cancelBtn = document.getElementById("clear-search")
    const [inputValue, setinputValue] = useState("")
    var presentItems = []
    const [displayItems, setdisplayItems] = useState([])
    const handleChange = (event) => {
        setinputValue(event.target.value)
        const searchItems = document.getElementById("search-items") 
        inputValue.length > 0 ? searchItems.style.display = "flex": searchItems.style.display = "none"
    }
    const ClearSearch = () => {
        setinputValue("")
        const searchItems = document.getElementById("search-items")
        searchItems.style.display = "none"
    }
    presentItems = props.items.filter((item) => {
        return (
            item.includes(inputValue.toLowerCase())
        )
    })
    /*setpresentItems(props.items.filter((item) => {
        return (
            item.includes(inputValue.toLowerCase())
        )
    }))*/
    const containsText = inputValue.length > 0
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
                    return <PaneOption key={item} name={item}/>
                })}
            </div>
        </div>
    )
}

export default SearchBar