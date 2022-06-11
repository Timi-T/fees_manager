import React from 'react'
import './schRegForm.css'
import BigBtn from '../bigBtn/bigBtn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import PaneOption from '../paneOption/paneOption'
import SelectedItem from '../schRegForm/schRegForm'

const SchoolRegForm = () => {

    const selected = []
    const [items, setItems] = useState(selected)

    const AddCustom = () => {
        const classroom = document.getElementById("custom").value
        if (classroom) {
            AddItem(classroom)
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
        if (items.includes(item) === false) {
            items.push(item)
            const new_items = items.map((item) => {
                return item
            })
            setItems(new_items)
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
        <div id="school-reg-container">
            <h1 id="reg-school-title">Register School</h1>
            <form className="school-reg-form">
                <p className="form-text">School name</p>
                <input className="input-field" type="text" placeholder="" name="school-name"></input>
                <p className="form-text">School address</p>
                <input className="input-field" type="text" placeholder="" name="school-address"></input>
                <p className="form-text">Level (Primary/Secondary)</p>
                <input className="input-field" type="text" placeholder="" name="level"></input>
            </form>
            <div>
                <div id="selection-dropdown-container">
                    <div id="selected-con">
                        {items.map((item) => {
                            return <div key={item} onClick={ () => PopItem(item) }><SelectedItem key={item} name={item} /></div>
                        })}
                    </div>
                    <div id="options-con">
                        <div id="add-class-btn" onClick={ToggleDropdown} >
                            <p>Select classrooms</p>
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
            </div>
            <form className="school-reg-form" id="school-reg-form2">
                <div id="custom-input-field">
                    <input className="input-field" id="custom" type="text" placeholder="Create custom classroom" name="custom-name"></input>
                    <p id="add-custom" onClick={ () => AddCustom() }>Add</p>
                </div>
                <p className="form-text" id="sch-reg-pwd">Admin Password</p>
                <input className="input-field" type="password" placeholder="" name="password"></input>
            </form>

            <div id="submit-sch"><BigBtn text="Create school" bcolor="rgb(84, 54, 84)" color="white" /></div>
        </div>
    )
}

export default ClsRegForm