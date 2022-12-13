import './editView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import BigBtn from '../bigBtn/bigBtn'
import { useState, useEffect } from 'react'
import { Loader } from '../Loader/Loader'

const EditClassroom = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    // classname classteacher classFees
    const [classroom, setClassroom] = useState({ name: '', classTeacher: '', classFees: '' });
    const [className, setClassName] = useState('');
    const [classTeacher, setClassTeacher] = useState('');
    const [classFees, setClassFees] = useState('');
    const [save, setSave] = useState(false);
    let editForm;
    
    useEffect(() => {
        fetch(`http://localhost:5002/api/v1/classrooms/${props.id}?schoolName=${localStorage.currentSchool}`, {
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
                setClassroom(obj.success);
                setClassName(obj.success.name);
                setClassTeacher(obj.success.classTeacher);
                setClassFees(obj.success.classFees);  
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
                <h4 className='input-txt'>Class name:</h4>
                <div className='edit-input'>
                    <input id='input-clsname' type='text' defaultValue={classroom.name} name='clsname' onChange={(event) => setClassName(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Class Teacher:</h4>
                <div className='edit-input'>
                    <input id='input-teacher' type='text' defaultValue={classroom.classTeacher} name='teacher' onChange={(event) => setClassTeacher(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Class Fees:</h4>
                <div className='edit-input'>
                    <input id='input-fees' type='number' defaultValue={classroom.classFees} name='fees' onChange={(event) => setClassFees(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single' >
                <h4 className='input-txt' >Classroom ID:</h4>
                <div className='edit-input'>
                    <input id='input-id' className='immutable' type='text' value={classroom._id} name='id' readOnly ></input>
                </div>
            </div>
        </div>

    const saveEdit = () => {
        setSave(true);
    }

    const editClass = () => {
        console.log('put request')
        navigate(`/classrooms/${props.id}`);
    }

    const saveForm = 
        <form id='save-form'>
            <div id="input-single">
                <input className='immutable' value={`${className}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${classTeacher}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${classFees}`} readOnly></input>
            </div>
            <div id='final-buttons'>
                <button className='checkout-btns' onClick={() => setSave(false)}>Cancel</button>
                <button className='checkout-btns' id='confirm-btn' onClick={() => editClass()}>Confirm</button>
            </div>
        </form>

    return (
        <div id='edit-con'>
            <div id='nav-btns' >
                <div id='return' onClick={() => {
                    navigate(`/classrooms/${props.id}`);
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
                        <h3 id='edit-title'>Edit classroom</h3>
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

export default EditClassroom;