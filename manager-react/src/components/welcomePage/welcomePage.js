import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BigBtn from '../bigBtn/bigBtn'
import DisplayCard from '../displayCard/displayCard'
import { Loader } from '../Loader/Loader'
import './welcomePage.css'


const WelcomePage = (props) => {
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5002/api/v1/schools', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setTimeout(() => {
                        setIsLoading(false);
                        setSchools(data.success);
                    }, 1000);
                })
            } else if(response.status === 401) {
                navigate('/login');
            } else {
                response.json().then((message) => {
                    setTimeout(() => {
                        //setIsLoading(false);
                        //alertMessage(message.error, 'block', 'red');
                    }, 3000)
                })
            }
        })
        .catch((err) => {
            setIsLoading(false);
            //alertMessage('An error occured. Please retry', 'block', 'red');
            console.log(err.message)
        });
    }, []);

    return (
        <div id="welcome-page">
            <h1 id="welcome-name">Welcome {props.name}!</h1>
            {
                isLoading
                ?
                <Loader loadingText={'Loading...'} />
                :
                schools.length > 0
                ?
                <div id="welcome">
                    <div id="welcome-container-schools">
                        <h3>Please select a school to continue</h3>
                            <div id="schools-list">
                            {schools.map((sch) => {
                                return (
                                    <div key={sch._id} onClick={() => {
                                        localStorage.setItem('currentSchool', sch.name);
                                        navigate("/schools/" + sch.name.replace(new RegExp(' ', 'g'), '_'));
                                    }}>
                                        <DisplayCard name={sch.name} description={sch.address} />
                                    </div>
                                )
                            })}
                            </div>
                    </div>
                </div>
                :
                <div id="welcome-container">
                    <div id="welcome-title">
                        <h1>Welcome {props.name}!</h1>
                    </div>
                    <div id="welcome-text">
                        <h2>Let's get you Started!</h2>
                        <p>Take a little time to watch this 1 munite video as we guide you through the management process.</p>
                    </div>
                    <div id="demo-video">
                        <video src="./demo.mp4" controls autoPlay>
                        </video>
                    </div>
                    <div id="welcome-create-btn" onClick={() => {
                        navigate("/register-school");
                    }}>
                        <BigBtn text="Create School" color="white" bcolor="rgb(60, 7, 60)" />
                    </div>
                </div>
            }
        </div>
    )
}

export default WelcomePage