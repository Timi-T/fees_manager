import './editView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import BigBtn from '../bigBtn/bigBtn'
import { useState, useEffect } from 'react'
import { Loader } from '../Loader/Loader'

const EditStudent = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [classrooms, setClassrooms] = useState([]);
    const [student, setStudent] = useState({ fullname: '', age: '', sex: '', discount: '', classroom: '', phoneNo: '', _id: '' });
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [phone, setPhone] = useState('');
    const [classroom, setClassroom] = useState('');
    const [discount, setDiscount] = useState('');
    const [save, setSave] = useState(false);
    let editForm;
    
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
                setTimeout(() => {
                    const classList = data.success.sort().map((cls) => {
                        return cls.name;
                    })
                    classList.sort();
                    setClassrooms(classList);
                    setIsLoading(false);
                }, 1000)
            });
        } else if(response.status === 401) {
            navigate('/login');
        } else {
            response.json().then((message) => {
                setIsLoading(false);
                //alertMessage(message.error, 'block', 'red');
            })
        }
        })
        .catch((err) => {
            setIsLoading(false);
        //alertMessage('An error occured. Please retry', 'block', 'red');
        console.log(err.message)
        });

        fetch(`http://localhost:5002/api/v1/students/${props.id}?schoolName=${localStorage.currentSchool}`, {
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
                setStudent(obj.success);
                setFirstname(obj.success.fullname.split(' ')[1]);
                setLastname(obj.success.fullname.split(' ')[0]);
                setSex(obj.success.sex);
                setPhone(obj.success.phoneNo);
                setClassroom(obj.success.classroom);
                setAge(obj.success.age);
                setDiscount(obj.success.discount);            
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
            <div id='input-pair'>
                <h4 className='input-txt' >Fullname:</h4>
                <div className='edit-input'>
                    <input type={'text'} defaultValue={(student.fullname?.split(' ')[1])} name='Firstname' onChange={(event) => setFirstname(event.target.value)}></input>
                </div>
                <div className='edit-input'>
                    <input type='text' defaultValue={(student.fullname?.split(' ')[0])} name='Lastname' onChange={(event) => setLastname(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Class:</h4>
                <select className="sex-dropdown" required name='classrooms' defaultValue={student.classroom} onChange={(event) => setClassroom(event.target.value)} >
                    {
                        classrooms.map((cls) => {
                            return (
                                <option key={cls} value={cls}>{cls}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Sex:</h4>
                <select className="sex-dropdown" required name='sex' onChange={(event) => setSex(event.target.value)}>
                    {student.sex === 'Male' ? <option value="Male">Male</option> : <option value="Female">Female</option>}

                    {student.sex === 'Female' ? <option value="Male">Male</option> : <option value="Female">Female</option>}
                </select>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Phone:</h4>
                <div className='edit-input'>
                    <input id='input-phone' type='text' defaultValue={student.phoneNo} name='phone' onChange={(event) => setPhone(event.target.value)}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Age:</h4>
                <div className='edit-input'>
                    <input id='input-age' type='number' defaultValue={student.age} name='age' onChange={(event) => setAge(event.target.value)} ></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>discount:</h4>
                <div className='edit-input'>
                    <input id='input-age' type='number' defaultValue={student.discount} name='discount' onChange={(event) => setDiscount(event.target.value)} ></input>
                </div>
            </div>
            <div id='input-single' >
                <h4 className='input-txt' >Student ID:</h4>
                <div className='edit-input'>
                    <input id='input-id' className='immutable' type='text' value={student._id} name='id' readOnly ></input>
                </div>
            </div>
        </div>

    const saveEdit = () => {
        setSave(true);
    }

    const editStudent = () => {
        console.log('put request')
        navigate(`/students/${props.id}`);
    }

    const saveForm = 
        <form id='save-form'>
            <div id="input-single">
                <input className='immutable' value={`${lastname} ${firstname}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${classroom}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${sex}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${phone}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${age}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${discount}`} readOnly></input>
            </div>
            <div id='final-buttons'>
                <button className='checkout-btns' onClick={() => setSave(false)}>Cancel</button>
                <button className='checkout-btns' id='confirm-btn' onClick={() => editStudent()}>Confirm</button>
            </div>
        </form>

    return (
        <div id='edit-con'>
            <div id='nav-btns' >
                <div id='return' onClick={() => {
                    navigate(`/students/${props.id}`);
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
                        <h3 id='edit-title'>Edit student</h3>
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

export default EditStudent;