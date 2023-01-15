import "./SchoolsPage.css";
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import React, { useEffect, useState } from "react";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const SchoolsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [container, setContainer] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_HOST}/schools`, {
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

export default SchoolsPage;
