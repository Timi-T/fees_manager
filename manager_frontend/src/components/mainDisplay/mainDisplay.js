import React from 'react'
import DisplayCard from '../displayCard/displayCard'
import './mainDisplay.css'


const MainDisplay = () => {
    return (
        <div id="main">
            <DisplayCard name={"The Potter's Home School"} description={"08, Akinsola Street, Dopemu, Lagos"} object={"School"} />
            <DisplayCard name={"LordsField Schools"} description={"08, Adebiyi Ayopo Street, Dopemu, Lagos"} object={"School"} />
            <DisplayCard name={"Ogunbode Opeyemi"} description={"Primary 5"} object="Student"/>
            <DisplayCard name={"Ogunbode Opeyemi"} description={"Primary 5"} object="Student"/>
            <DisplayCard name={"Ogunbode Opeyemi"} description={"Primary 5"} object="Student"/>
            <DisplayCard name={"Ogunbode Opeyemi"} description={"Primary 5"} object="Student"/>
            <DisplayCard name={"Ogunbode Opeyemi"} description={"Primary 5"} object="Student"/>
            <DisplayCard name={"Ogunbode Opeyemi"} description={"Primary 5"} object="Student"/>
        </div>
    )
}
export default MainDisplay