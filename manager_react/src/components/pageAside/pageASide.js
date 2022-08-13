import React from 'react'
import BigBtn from '../bigBtn/bigBtn'
import './pageAside.css'
//import SearchBar from '../searchBar/searchBar'


const PageAside = (props) => {
    return (
        <div id="aside">
            <h2 id="aside-title">{"Manage " + props.view}</h2>
            {props.options}
        </div>
    )
}

export default PageAside