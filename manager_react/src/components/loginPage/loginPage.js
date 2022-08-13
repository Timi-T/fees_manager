import React from 'react';
import './loginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

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
                {props.form}
            </div>
        </div>       
    )
}

const LoginPage = () => {
    const navigate = useNavigate()
    const loginForm = 
        <form id="login-form">
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <p id="reset-pwd">
                Forgot password?
            </p>
            <div id="login-button" onClick={() => {
                navigate("/");
            }}>
                Login
            </div>
        </form>
    return (
        <LoginSignup form={loginForm} logoColor={"white"} loginstyle={{borderBottom: "5px solid rgb(82, 26, 82)"}} />
    )
}

export default LoginPage