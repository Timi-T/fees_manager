import React from 'react'
import StudentDisplay from '../studentsDisplay/studentsDisplay'
//import SchoolRegForm from '../schRegForm/schRegForm'
//import DetailView from '../detailView/detailView'
//import WelcomePage from '../welcomePage/welcomePage'
//import DisplayCard from '../displayCard/displayCard'
//import ClsRegForm from '../clsRegForm/clsRegForm'
//import StuRegForm from '../stuRegForm/stuRegForm'
import './mainDisplay.css'


const MainDisplay = () => {
    /*return (
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

    return (
        <div id="main">
            <DetailView name={"Potter's Home School"} description={"21, Akinsola Street, Dopemu Agege, Lagos"}/>
        </div>
    )

    return (
        <div id="main">
            <WelcomePage name={"Opeyemi"} />
        </div>
    )*/

    /*return (
        <div id="main">
            <SchoolRegForm />
        </div>
    )

    return (
        <div id="main">
            <ClsRegForm />
        </div>
    )

    return (
        <div id="main">
            <StuRegForm />
        </div>
    )*/

    return (
        <div id="studentDisplay">
            <StudentDisplay />
        </div>
    )
}

export default MainDisplay