import React from 'react'
import './selectionDropdown.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import PaneOption from '../paneOption/paneOption'


const SelectedItem = (props) => {
    return(
        <div id="selected-item">
            {props.name}
            <FontAwesomeIcon icon={faCircleXmark} color="whitesmoke" />
        </div>
    )
}

const SelectionDropdown = (props) => {

    const selected = []
    const [items, setItems] = useState(selected)

    const AddCustom = () => {
        const classroom = document.getElementById("custom").value
        if (classroom) {
            AddItem(classroom)
            document.getElementById("custom").value = ""
        }
    }

    const PopItem = (item) => {
        const index = items.indexOf(item)
        if (index > -1) {
            items.splice(index, 1)
            const new_items = items.map((item) => {
                return item
            })
            setItems(new_items)
        }
    }

    const AddItem = (item) => {
        if (props.mode === "single") {
            if (items.includes(item) === false && items.length === 0) {
                items.push(item)
                const new_items = items.map((item) => {
                    return item
                })
                setItems(new_items)
            }
        }
        else {
            if (items.includes(item) === false) {
                items.push(item)
                const new_items = items.map((item) => {
                    return item
                })
                setItems(new_items)
            }
        }
    }

    const ToggleDropdown = () => {
        const dropdown = document.getElementById("selection-dropdown")
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none"
        }
        else {
            dropdown.style.display = "block"
        }
    }

    return (
        <div>
            <div id="selection-dropdown-container">
                <div id="selected-con">
                    {items.map((item) => {
                        return <div key={item} onClick={ () => PopItem(item) }><SelectedItem key={item} name={item} /></div>
                    })}
                </div>
                <div id="options-con">
                    <div id="add-class-btn" onClick={ToggleDropdown} >
                        <p>Select {props.dropdownName}</p>
                        <div id="dropdown-arrow"><FontAwesomeIcon icon={faCaretDown} color="white" /> </div>
                    </div>
                    <div id="selection-dropdown">
                        <div onClick={ () => AddItem("Primary 1") }><PaneOption name="Primary 1" bcolor="whitesmoke"  /></div>
                        <div onClick={ () => AddItem("Primary 2") }><PaneOption name="Primary 2" bcolor="whitesmoke"  /></div>
                        <div onClick={ () => AddItem("Primary 3") }><PaneOption name="Primary 3" bcolor="whitesmoke"  /></div>
                        <div onClick={ () => AddItem("Primary 4") }><PaneOption name="Primary 4" bcolor="whitesmoke"  /></div>
                        <div onClick={ () => AddItem("Primary 5") }><PaneOption name="Primary 5" bcolor="whitesmoke"  /></div>
                        <div onClick={ () => AddItem("Primary 6") }><PaneOption name="Primary 6" bcolor="whitesmoke"  /></div>
                    </div>
                </div>
            </div>
            <div id="custom-input-field">
                {props.custom ? <input className="input-field" id="custom" type="text" placeholder="Create custom classroom" name="custom-name"></input>: <p></p>}
                {props.custom ?  <p id="add-custom" onClick={ () => AddCustom() }>Add</p>: <p></p>}
            </div>
        </div>
    )
}

export default SelectionDropdown