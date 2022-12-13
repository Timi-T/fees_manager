import React, { useCallback, useEffect, useState } from 'react';
import './VerifyEmail.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
const timeDelta = require('time-delta');
const sha1 = require('sha1')

const VerifyEmail = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState('5:00');
    const [reset, setReset] = useState(false);
    const [click, setClick] = useState(false);

    const handleCodeChange = (event) => {
      setCode(event.target.value);
      alertMessage('', 'none', '');
    }

    useEffect(() => {
      setTimeout(() => {
        setReset(true);
        setClick(false);
        const btn = document.getElementById('resend-btn');
        btn.style.backgroundColor = 'rgb(60, 7, 60)';
        btn.style.cursor = 'pointer'
        const resentMsg = document.getElementById('resent')
        resentMsg.innerHTML = '';
      }, 5 * 60 * 1000);
    }, [click]);

    const resetClick = () => {
      if (!click) {
        setClick(true);
        const btn = document.getElementById('resend-btn');
        btn.style.backgroundColor = 'grey';
        btn.style.cursor = 'default';
        fetch('http://localhost:5002/api/v1/resend-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ email: location.state.email })
        })
        .then((response) => {
          if (response.ok) {
            const resentMsg = document.getElementById('resent');
            resentMsg.innerText = 'Verification code has been sent! Please check your mail';
            resentMsg.style.color = 'green';
          }
          else {
            const resentMsg = document.getElementById('resent');
            resentMsg.innerText = 'An error occured. Please retry';
            resentMsg.style.color = 'red';
          }
        })
        .catch((err) => {
          console.log(err)
          const resentMsg = document.getElementById('resent');
          resentMsg.innerText = 'An error occured. Please retry';
          resentMsg.style.color = 'red';
        });
      }
    }

    const alertMessage = (message, display, color) => {
      const msg = document.getElementById('verify-err-msg');
      msg.innerHTML = message;
      msg.style.display = display;
      msg.style.color = color;
    }

    const verifyEmail = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      fetch('http://localhost:5002/api/v1/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ code })
      })
      .then((response) => {
        if (response.ok) {
          setTimeout(() => {
            alertMessage('Success! Your email has been verified.<p id="tiny-txt">You will be redirected shortly.</p>', 'block', 'green');
            setIsLoading(false);
          }, 3000);
          setTimeout(() => {
            navigate('/login');
          }, 5000)
        }
        else {
          setTimeout(() => {
            setIsLoading(false);
            alertMessage('Wrong code. Please check the code and retry.<p id="tiny-txt">or resend code if expired</p>', 'block', 'red');
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          alertMessage('An error occured. Please retry', 'block', 'red');
          setIsLoading(false);
        }, 3000);
      });
    }

    useEffect(() => {
      if (code.length === 6) {
        verifyEmail();
      }
    }, [code]);

    const verifyLayout = 
        <div id="contd">
            <p className='verify-text'>
                An Email has been sent to <b>{ location.state.email }</b>. Kindly check your mail and provide the verification code sent to you.
            </p>
            <input id="verify-input" type="password" placeholder="XXX-XXX" onChange={handleCodeChange} minLength={6} maxLength={6} required></input>
            <div id="verify-err-msg"></div>
            <p id='tiny-txt'>The code expires after 5 minutes</p>
            <p id='tiny-txt'>resend {timeLeft}</p>
            <div id="resend-btn" onClick={resetClick}>Resend</div>
            <div id='resent'></div>
        </div>

    return (
        <div id="verify-page">
            <div id="verify-content">
                <h2 id="verify-header">Thank you! Please verify your Email</h2>
                { isLoading ? <Loader loadingText={"Verifying..."} /> : verifyLayout}
            </div>
        </div>
    )
}

export default VerifyEmail