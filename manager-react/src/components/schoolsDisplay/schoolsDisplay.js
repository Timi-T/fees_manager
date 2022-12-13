import React, { useEffect, useState } from "react";
import "./schoolsDisplay.css"
import DisplayCard from "../displayCard/displayCard";
import { useNavigate } from "react-router-dom";
import BigBtn from "../bigBtn/bigBtn";
import { Loader } from "../Loader/Loader";

const SchoolsDisplay = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [container, setContainer] = useState('');
    const alertMessage = (message, display, color) => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }
    useEffect(() => {
      fetch('http://localhost:5002/api/v1/schools', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })
      .then((response) => {
        if (response.ok) { 
            response.json().then((data) => {
              const schools = data.success;
              setTimeout(() => {
                setContainer(
                    schools.map( (sch) => {
                        return (
                            <div key={sch._id} onClick={() => {
                                navigate("/schools/" + sch.name.replace(new RegExp(' ', 'g'), '_'));
                            }}>
                                <DisplayCard name={sch.name} description={sch.address} />
                            </div>
                        )
                    })
                )
                const containerDisplay = document.getElementById('container');
                containerDisplay.style.display = 'grid';
                setIsLoading(false);
              }, 1000);
            });
        } else if(response.status === 401) {
            navigate('/login');
        } else {
            response.json().then((message) => {
                setIsLoading(false);
                alertMessage(message.error, 'block', 'red');
            })
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alertMessage('An error occured. Please retry', 'block', 'red');
        console.log(err.message)
      });
    }, []);

    return (
        <div id="big-con">
            <div id="schools-header">
                    <h1>Your Schools</h1>
            </div>
            <div id="reg-sch" onClick={() => {
                navigate("/register-school");
            }}>
                <BigBtn text="Register school" bcolor="rgb(60, 7, 60)" color="white" />
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

export default SchoolsDisplay