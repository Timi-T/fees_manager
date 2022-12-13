import './editView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import BigBtn from '../bigBtn/bigBtn'
import { useState, useEffect } from 'react'
import { Loader } from '../Loader/Loader'

const EditSchool = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [school, setSchool] = useState({ name: '', address: '', level: '' });
    const [level, setLevel] = useState('');
    const [schName, setSchName] = useState('');
    const [address, setAddress] = useState('');
    const [save, setSave] = useState(false);
    let editForm;
    
    useEffect(() => {
        fetch(`http://localhost:5002/api/v1/schools/${localStorage.currentSchool}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })
      .then((response) => {
        if (response.ok) { 
            response.json().then((obj) => {
              setTimeout(() => {
                setSchool(obj.success);
                setLevel(obj.success.level);
                setSchName(obj.success.name);
                setAddress(obj.success.address);  
                setIsLoading(false)          
              }, 1000)
            });
        } else if(response.status === 401) {
            navigate('/login');
        } else {
            response.json().then((message) => {
                setTimeout(() => {
                    setIsLoading(false);
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

    editForm =
        <div>
            <div id='input-single'>
                <h4 className='input-txt'>Name:</h4>
                <div className='edit-input'>
                    <input id='input-schname' type='text' defaultValue={school.name} name='schname' onChange={(event) => setSchName(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Address:</h4>
                <div className='edit-input'>
                    <input id='input-schname' type='text' defaultValue={school.address} name='address' onChange={(event) => setAddress(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Level:</h4>
                <select className="level-dropdown" name='level' required onChange={(event) => setLevel(event.target.value)}>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Tertiary">Tertiary</option>
                  <option value="Other">Other</option>
                </select>
            </div>
            <div id='input-single' >
                <h4 className='input-txt' >School ID:</h4>
                <div className='edit-input'>
                    <input id='input-id' className='immutable' type='text' value={school._id} name='id' readOnly ></input>
                </div>
            </div>
        </div>

    const saveEdit = () => {
        setSave(true);
    }

    const editSchool = () => {
        console.log('put request')
        navigate(`/schools/${schName}`);
    }

    const saveForm = 
        <form id='save-form'>
            <div id="input-single">
                <input className='immutable' value={`${schName}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${address}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${level}`} readOnly></input>
            </div>
            <div id='final-buttons'>
                <button className='checkout-btns' onClick={() => setSave(false)}>Cancel</button>
                <button className='checkout-btns' id='confirm-btn' onClick={() => editSchool()}>Confirm</button>
            </div>
        </form>

    return (
        <div id='edit-con'>
            <div id='nav-btns' >
                <div id='return' onClick={() => {
                    navigate(`/schools/${schName}`);
                }}>
                    <FontAwesomeIcon id='back' icon={faArrowLeftLong} color='rgb(60, 7, 60)' size='2x' />
                </div>
                {
                    isLoading
                    ?
                    <div></div>
                    :
                    save
                    ?
                    <div></div>
                    :
                    <div id='save-btn' onClick={saveEdit}>
                        <BigBtn text='save' bcolor='rgb(60, 7, 60)' color='white' />
                    </div>
                }
            </div>
            <div id='info-page'>
                <div>
                    {
                        save
                        ?
                        <h3 id='edit-title'>Confirm changes</h3>
                        :
                        <h3 id='edit-title'>Edit school</h3>
                    }
                </div>
                {
                    isLoading
                    ?
                    <Loader loadingText={'Loading...'} />
                    :
                    save
                    ?
                    saveForm
                    :
                    <div id='form-info'>
                        {editForm}
                    </div>
                }
            </div>
        </div>
    )
}

export default EditSchool;