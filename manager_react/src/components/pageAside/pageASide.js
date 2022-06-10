import React from 'react'
import './pageAside.css'
//import SearchBar from '../searchBar/searchBar'


const PageAside = (props) => {
    return (
        <div id="aside">
            <h3 id="aside-title">{props.title}</h3>
            {props.content}
        </div>
    )
}

export default PageAside