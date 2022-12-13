import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BigBtn from '../bigBtn/bigBtn';
import { Loader } from '../Loader/Loader';
import'./studentsDisplay.css'
import DisplayCard from '../displayCard/displayCard';

const StudentDisplay = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState('');
    const [studentList, setStudentList] = useState('');
    const [classnames, setClassnames] = useState([]);
    const alertMessage = (message, display, color) => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }

    useEffect(() => {
        alertMessage('', 'none', 'green');
        fetch(`http://localhost:5002/api/v1/students?schoolName=${localStorage.currentSchool}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
        })
        .then((response) => {
          if (response.ok) { 
              response.json().then((data) => {
                setStudents(data.success);
                setStudentList(data.success);
                setTimeout(() => {
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
                const classList = data.success.sort().map((cls) => {
                    return cls.name;
                })
                classList.sort();
                setClassnames(classList)
                setCheckedClassrooms(new Array(classList.length).fill(false))
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);
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
      }, []);

    //const classnames = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'];
    const sexes = ['Male', 'Female'];
    const [checkedSex, setCheckedSex] = useState(new Array(2).fill(false));
    const [checkedClassrooms, setCheckedClassrooms] = useState([]);
    const [checkedDiscount, setCheckedDiscount] = useState(false);
    const [searchText, setSearchText] = useState('');

    const CurrentFilters = () => {
        /* ==== Check current filters in place ==== */
        let i = 0;
        let classEmpty = true;
        let updatedStudentList = [];
        let currentStudents = [];
        for (const state of checkedClassrooms) {
            if (state) {
                classEmpty = false;
                let temp = ((students.filter((stu) => {
                    return (stu.class === classnames[i]);
                })))
                updatedStudentList = updatedStudentList.concat(temp);
            }
            i++;
        }
        if (classEmpty) {
            currentStudents = students;
        }
        currentStudents = currentStudents.concat(updatedStudentList);
        return currentStudents;
    }

    const FilterClass = (position) => {
        /* ==== Filter based on classrooms ==== */
        /* Resetting other filters */
        setCheckedSex([false, false]);
        setCheckedDiscount(false);
        /* Done resetting! */
        let updatedClassState = checkedClassrooms;
        updatedClassState = checkedClassrooms.map((cls, index) => {
            return (index === position ? !cls : cls);
        });
        setCheckedClassrooms(updatedClassState)

        // Update the students
        let updatedStudentList = [];
        let classEmpty = true;
        let i = 0;
        for (const state of updatedClassState) {
            if (state) {
                classEmpty = false;
                let temp = ((students.filter((stu) => {
                    return (stu.classroom === classnames[i]);
                })))
                updatedStudentList = updatedStudentList.concat(temp);
            }
            i++;
        }
        if (classEmpty) {
            setStudentList(students);
        } else {
            setStudentList(updatedStudentList);
        }
        /* ==== Done updating list based on classrooms ==== */
    }
        
    const FilterSex = (position) => {
        /* ==== Filter based on selected sex ==== */
        const currentStudents = CurrentFilters();

        // Update true, false values in array
        const updatedSexState = checkedSex.map((sex, index) => {
            return (index === position ? !sex : sex);
        })
        setCheckedSex(updatedSexState);

        // Update students based on sex
        let updatedStudentList = [];
        let sexEmpty = true;
        let i = 0;
        for (const state of updatedSexState) {
            if (state) {
                sexEmpty = false;
                let temp = ((currentStudents.filter((stu) => {
                    return (stu.sex === sexes[i]);
                })))
                updatedStudentList = updatedStudentList.concat(temp);
            }
            i++;
        }
        if (sexEmpty) {
            setStudentList(currentStudents);
        } else {
            setStudentList(updatedStudentList);
        }

        /* ==== Done updating based on sex ==== */
    }

    const FilterDiscount = () => {
        /* ==== Filter based on discounted fees ==== */
        const currentStudents = CurrentFilters();

        // Uncheck other boxes except class boxes
        setCheckedSex([false, false]);

        const currentDiscount = !checkedDiscount;
        setCheckedDiscount(currentDiscount);

        // Update students based on applied discounts    
        if (currentDiscount) {
            const updatedStudentList = ((currentStudents.filter((stu) => {
                return (stu.discount > 0);
            })))
            setStudentList(updatedStudentList);
        } else {
            setStudentList(currentStudents);
        }  
    }

    const SearchStudent = (event) => {
        setSearchText(event.target.value);

        // Reset checkboxes
        setCheckedDiscount(false);
        setCheckedSex([false, false]);
        const resetClass = new Array(classnames.length).fill(false);
        setCheckedClassrooms(resetClass);
        if (event.target.value.length > 0) {
            const currentStudents = students.filter((stu) => {
                return (stu.fullname.toLowerCase().includes(event.target.value));
            })
            setStudentList(currentStudents);
        }
        else {
            setStudentList(students);
        }
    }

    const ClassFilterComponent = () => {
        return (
            <div className="filter-component" id="ClassFilter">
                <div className="filter-option"><p>..Classroom</p></div>
                <div id="class-options">
                    {
                        classnames.map((cls) => {
                            return(
                                <div key={cls} className="c-o">
                                    <input type="checkbox" id={cls + 'opt'} value={cls} checked={checkedClassrooms[classnames.indexOf(cls)]} onChange={() => FilterClass(classnames.indexOf(cls))}></input>
                                    <label>{cls}</label><br></br>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div id="students-view-con">
            <div id="filters-con">
                <div id="filter-title"><h5>Filter by...</h5></div>
                <ClassFilterComponent />
                <FeesFilter />
                <div id="sex-filter">
                    <div className="filter-option"><p>..Sex</p></div>
                    <input type="checkbox" id="male" value="male" checked={checkedSex[0]} onChange={() => FilterSex(0)}></input>
                    <label>Male</label><br></br>
                    <input type="checkbox" id="female" value="female" checked={checkedSex[1]} onChange={() => FilterSex(1)}></input>
                    <label>Female</label><br></br>
                </div>
                <div id="discount-filter">
                    <div className="filter-option"><p>..Discount (%)</p></div>
                    <input type="checkbox" id="applied-discount" value="discount" checked={checkedDiscount} onChange={FilterDiscount}></input>
                    <label>Applied discount</label><br></br>
                </div>
                <div id="search-filter">
                    <div className="filter-option"><p>Search student</p></div>
                    <input id="stu-search-box" type="text" className="filter-input" onChange={SearchStudent}></input>
                </div>
            </div>
            <div id="students-con">
                <div id="top-section">
                    <div id="regstu" onClick={() => {
                        navigate("/register-student");
                    }}>
                        <BigBtn color="white" bcolor="rgb(60, 7, 60)" text="Register Student"/>
                    </div>
                    <div id="students-con-header">
                        <ScrollOption name={"Student name"} class={"Class"} fees={"Fees(%)"} discount={"Discount (%)"} sex={"Sex"} header={true} />
                    </div>
                </div>
                <div id="login-signup-msg">
                    <h5 id="err-msg"></h5>
                </div>
                {
                    isLoading ? <Loader loadingText={'Loading...'} /> :
                    studentList ? studentList.map((stu) => {
                        return (
                            <div key={stu._id} onClick={() => {
                                navigate(`/students/${String(stu._id)}`)
                            }}>
                                <ScrollOption key={stu._id} name={stu.fullname} class={stu.classroom} fees={stu.totalPaidFees} discount={stu.discount} sex={stu.sex} header={false}/>
                            </div>
                        );
                    }) : <div></div>
                }
            </div>
        </div>
    )
}

export const FeesFilter = () => {
    //const percentages = ["0 - 25", "26 - 50", "51 - 75", "76 - 100", "> 100" ]
    return (
        <div className="filter-component" id="FeesFilter">
            <div className="filter-option"><p>..Fees percentage</p></div>
            <input type="number" max="100" maxLength="3" className="filter-input" placeholder="min" id="min-percent"></input>
            <input type="number" max="100" maxLength="3" className="filter-input" placeholder="max" id="max-percent"></input>
        </div>
    )
}

export const ScrollOption = (props) => {

    return (
        <div id={props.header ? "ScrollOption-header" : "ScrollOption"}>
            <div className={props.header ? 'scroll-header' : 'scroll-col'} id="scroll-name"><h5>{props.name}</h5></div>
            <div className={props.header ? 'scroll-header' : 'scroll-col'} id="scroll-class"><h5>{props.class}</h5></div>
            <div className={props.header ? 'scroll-header' : 'scroll-col'} id="scroll-fees"><h5>{props.fees}</h5></div>
            <div className={props.header ? 'scroll-header' : 'scroll-col'} id="scroll-sex"><h5>{props.sex}</h5></div>
            <div className={props.header ? 'scroll-header' : 'scroll-col'} id="scroll-discount"><h5>{props.discount}</h5></div>
        </div>
    )
}

export default StudentDisplay