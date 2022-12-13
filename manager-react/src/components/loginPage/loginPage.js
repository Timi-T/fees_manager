import React, { useState } from 'react';
import './loginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleRoof, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { Loader } from '../Loader/Loader';

export const LoginSignup = (props) => {
    const navigate = useNavigate()
    return (
        <div id="login-page">
            <div id="loginpage-leftside">
                <div id="login-logo"><FontAwesomeIcon icon={faPeopleRoof} size="7x" color={props.logoColor} /></div>
                <h3 id="login-logo-title">Fees Manager</h3>
            </div>
            <div id="loginpage-rightside">
                <div id="login-signup-header">
                    <div id="select-login" style={props.loginstyle} onClick={() => {
                        navigate("/login");
                    }}>
                        <h2>Login</h2>
                    </div>
                    <div id="select-signup" style={props.signupstyle} onClick={() => {
                        navigate("/signup");
                    }}>
                        <h2>Signup</h2>
                    </div>
                </div>
                <div id="login-signup-msg">
                    <h3 id="err-msg"></h3>
                </div>
                {props.form}
            </div>
        </div>       
    )
}

const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
      alertMessage('', 'block', '');
    }
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      alertMessage('', 'block', '');
    }

    const alertMessage = (message, display, color) => {
      const msg = document.getElementById('err-msg');
      msg.innerHTML = message;
      msg.style.display = display;
      msg.style.color = color;
    }

    const loginUser = (event) => {
      setIsLoading(true);
      event.preventDefault();
      const credentials = Buffer.from(`${email}:${password}`).toString('base64');
      fetch('http://localhost:5002/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          auth: credentials
        },
        credentials: "include",
        body: JSON.stringify({})
      })
      .then((response) => {
        //setIsLoading(false);
        if (response.ok) {
          response.json().then((message) => {
            alertMessage(message.success, 'block', 'green');
            setIsLoading(false);
            localStorage.setItem('currentSchool', '');
            navigate('/');
          })
        } else {
          response.json().then((message) => {
            if (message.error === 'Account not verified. Please verify your email to continue') {
              alertMessage(message.error, 'block', 'red');
              setTimeout(() => {
                setIsLoading(false);
                navigate('/verify-email', { state: { email } });
              }, 2000);
            }
            setTimeout(() => {
              setIsLoading(false);
              alertMessage(message.error, 'block', 'red');
            }, 500);
          });
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }
    const loginForm = 
        <form id="login-form" onSubmit={loginUser}>
          <input type="email" placeholder="Email" onChange={handleEmailChange} minLength={3} required></input>
          <input type="password" placeholder="Password" onChange={handlePasswordChange} required></input>
          <p id="reset-pwd" onClick={() => navigate('/reset-password')}>Forgot password?</p>
          <button type="submit" id="login-button">Login</button>
        </form>
    return (
        <LoginSignup form={isLoading ? <Loader loadingText={"Logging in..."} /> : loginForm} logoColor={"white"} loginstyle={{borderBottom: "5px solid rgb(82, 26, 82)"}} />
    )
}

export default LoginPage