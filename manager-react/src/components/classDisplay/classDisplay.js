import React, { useEffect, useState } from "react";
import './classDisplay.css'
import { useNavigate } from "react-router-dom";
import DisplayCard from "../displayCard/displayCard";
import BigBtn from "../bigBtn/bigBtn";
import { Loader } from "../Loader/Loader";


/*const classrooms = [
    {'name': "Primary 1", "description": "The Potters Home School", 'id': 1},
    {'name': "Primary 2", "description": "The Potters Home School", 'id': 2},
    {'name': "Primary 3", "description": "The Potters Home School", 'id': 3},
    {'name': "Primary 4", "description": "The Potters Home School", 'id': 4},
    {'name': "Primary 5", "description": "The Potters Home School", 'id': 5},
    {'name': "Primary 6", "description": "The Potters Home School", 'id': 6},
    {'name': "Primary 7", "description": "The Potters Home School", 'id': 7},
    {'name': "Primary 8", "description": "The Potters Home School", 'id': 8},
    {'name': "Primary 9", "description": "The Potters Home School", 'id': 9},
    {'name': "Primary 10", "description": "The Potters Home School", 'id': 10},
]*/
const ClassDisplay = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [container, setContainer] = useState('');
    const alertMessage = (message, display, color) => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }

    useEffect(() => {
      fetch(`http://localhost:5002/api/v1/classrooms?schoolName=${localStorage.currentSchool}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })
      .then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                const classrooms = data.success.map((cls) => {
                    return cls.name;
                });
                classrooms.sort();
                setTimeout(() => {
                  setContainer(
                    classrooms.map( (cls) => {
                        return (
                            <div key={cls} onClick={() => {
                                navigate(`/classrooms/${cls.replace(new RegExp(' ', 'g'), '_')}`);
                            }}>
                                <DisplayCard name={cls} description={localStorage.currentSchool} />
                            </div>
                        )
                    })
                  )
                  const containerDisplay = document.getElementById('container');
                  containerDisplay.style.display = 'grid';
                  setIsLoading(false);
                }, 2000);
            });
        } else if(response.status === 401) {
            navigate('/login');
        } else {
            response.json().then((message) => {
                setTimeout(() => {
                    setIsLoading(false);
                    alertMessage(message.error, 'block', 'red')
                }, 2000);
            })
        }
      })
      .catch((err) => {
        setTimeout(() => {
            setIsLoading(false);
            alertMessage('An error occured. Please retry', 'block', 'red');
            console.log(err.message)
        })
      })
    }, [])

    return (
    <div id="big-con">
        <div id="schools-header">
            <h1>Classrooms</h1>
        </div>
        <div id="reg-cls" onClick={() => {
                navigate("/register-classroom");
        }}>
            <BigBtn text="Register Classroom" bcolor="rgb(60, 7, 60)" color="white" />
        </div>
        <div id="login-signup-msg">
            <h3 id="err-msg"></h3>
        </div>
        <div id="container">
            {
                isLoading ? <Loader loadingText={'Loading...'} /> : container
            }
        </div>
    </div>
)
}

export default ClassDisplay