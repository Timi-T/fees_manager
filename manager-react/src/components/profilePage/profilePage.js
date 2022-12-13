import './profilePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import BigBtn from '../bigBtn/bigBtn'
import { useState, useEffect } from 'react'
import { Loader } from '../Loader/Loader'

const ProfilePage = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [classrooms, setClassrooms] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.user));
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [save, setSave] = useState(false);
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [samePwd, setSamePwd] = useState('');
    const [pwdSave, setPwdSave] = useState(false);
    let editForm;

    setTimeout(() => {
        setIsLoading(false);
    }, 1000);

    useEffect(() => {
        if (!isLoading) {
          const p1 = document.getElementById("input-new-pwd");
          const p2 = document.getElementById("input-same-pwd");
          const errMsg = document.getElementById('err');
          samePwd === newPwd ? p2.style.borderColor = 'green' : p2.style.borderColor = 'red';
          !samePwd ? p2.style.borderColor = 'gray' : console.log();
          oldPwd === newPwd ? p1.style.borderColor = 'red' : p1.style.borderColor = 'gray';
          oldPwd === newPwd ? errMsg.innerText = 'Old and new password can\'t be the same!' : errMsg.innerText = 'none';
          oldPwd === newPwd ? errMsg.style.display = 'block' : errMsg.style.display = 'none';

        }
    }, [samePwd, newPwd])

    editForm =
        <div>
            <div id='input-pair'>
                <h4 className='input-txt' >Fullname:</h4>
                <div className='edit-input'>
                    <input type={'text'} defaultValue={user.firstname} name='Firstname' onChange={(event) => setFirstname(event.target.value)}></input>
                </div>
                <div className='edit-input'>
                    <input type='text' defaultValue={user.lastname} name='Lastname' onChange={(event) => setLastname(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Phone:</h4>
                <div className='edit-input'>
                    <input id='input-phone' type='text' defaultValue={user.phone} name='phone' onChange={(event) => setPhone(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Email:</h4>
                <div className='edit-input'>
                    <input id='input-phone' className='immutable' type='text' defaultValue={user.email} name='phone' readOnly ></input>
                </div>
            </div>
            <div id='input-single' >
                <h4 className='input-txt' >user ID:</h4>
                <div className='edit-input'>
                    <input id='input-id' className='immutable' type='text' value={user._id} name='id' readOnly ></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Password:</h4>
                <button className='change-pwd-btn' onClick={() => {
                    setPwdSave(true);
                    setSave(true);
                }}>
                    Change password
                </button>
            </div>
        </div>

    const saveEdit = () => {
        setSave(true);
    }

    const editUser = () => {
        console.log('put request')
        //navigate(`/users/${props.id}`);
    }

    const editPassword = () => {
        console.log('change password')
    }

    const saveForm = 
        <form id='save-form'>
            <div id="input-single">
                <input className='immutable' value={lastname} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={firstname} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${phone}`} readOnly></input>
            </div>
            <div id='final-buttons'>
                <button className='checkout-btns' onClick={() => setSave(false)}>Cancel</button>
                <button className='checkout-btns' id='confirm-btn' onClick={() => editUser()}>Confirm</button>
            </div>
        </form>

    const changePwd =
        <div id='save-pwd'>
            <div id='input-single'>
                <h4 className='input-txt-2'>Old password:</h4>
                <div className='edit-input'>
                    <input id='input-old-pwd' type='password' name='old-pwd' onChange={(event) => setOldPwd(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt-2'>New password:</h4>
                <div className='edit-input'>
                    <input id='input-new-pwd' type='password' name='new-pwd' onChange={(event) => setNewPwd(event.target.value)} ></input>
                </div>
            </div>
            <div id='input-single' >
                <h4 className='input-txt-2' >Confirm password:</h4>
                <div className='edit-input'>
                    <input id='input-same-pwd' type='password' name='same-pwd' onChange={(event) => setSamePwd(event.target.value)} ></input>
                </div>
            </div>
            <div id='final-buttons'>
                <button className='checkout-btns' onClick={() => {
                    setSave(false);
                    setPwdSave(false);
                }}>
                    Cancel
                </button>
                <button className='checkout-btns' id='confirm-btn' onClick={() => editPassword()}>Confirm</button>
            </div>
        </div>

    return (
        <div id='profile-con'>
            <div id='nav-btns' >
                <div id='return' onClick={() => {
                    navigate(-1);
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
                        <h3 id='profile-title'>
                            {
                                pwdSave
                                ?
                                'Change password'
                                :
                                'Confirm changes'
                            }
                            <h5 id='err'></h5>
                        </h3>
                        :
                        <div id='pic-and-title'>
                            <div id='upload-and-pic'>
                                <img id='profile-pic' src='https://drive.google.com/uc?export=view&id=1gGHVqJMTHHr0WUslAde0RVDnUpkTUCS-' />
                                <input type="file" text='upload' id="input-pic" name="pic" accept="image/*"></input>
                            </div>
                            <h3 id='profile-title'>Your profile</h3>
                        </div>
                    }
                </div>
                {
                    isLoading
                    ?
                    <Loader loadingText={'Loading...'} />
                    :
                    save && pwdSave
                    ?
                    changePwd
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

export default ProfilePage;