import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BigBtn from '../bigBtn/bigBtn';
import'./studentsDisplay.css'

const StudentDisplay = () => {

    const students = [];
    for (let i = 0; i < 256; i++) {
       students.push({name: "Opeyemi Ogunbode", class: "Primary 1", fees: "59%", discount: "N/A", sex: "M", id: i, key: i + 'ope'});
    }
    students.push({name: "Timilehin Ogunbode", class: "Primary 3", fees: "89%", sex: "F", discount: "10%", id: 'p3', key: 'p3'});
    const classnames = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'];
    const sexes = ['M', 'F'];
    const [checkedSex, setCheckedSex] = useState(new Array(2).fill(false));
    const [checkedClassrooms, setCheckedClassrooms] = useState(new Array(classnames.length).fill(false));
    const [checkedDiscount, setCheckedDiscount] = useState(false);
    const [studentList, setStudentList] = useState(students);
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
                    return (stu.class === classnames[i]);
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
                return (stu.discount !== "N/A");
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
                return (stu.name.toLowerCase().includes(event.target.value));
            })
            setStudentList(currentStudents);
        }
        else {
            setStudentList(students);
        }
    }

    const ClassFilter = () => {
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

    const navigate = useNavigate();
    return (
        <div id="students-view-con">
            <div id="filters-con">
                <div id="filter-title"><h3>Filter by...</h3></div>
                <ClassFilter />
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
                <div id="regstu" onClick={() => {
                    navigate("/register-student");
                }}>
                    <BigBtn color="white" bcolor="rgb(60, 7, 60)" text="Register Student"/>
                </div>
                <div id="students-con-header">
                    <ScrollOption name={"Student name"} class={"Class"} fees={"Fees(%)"} discount={"Discount (%)"} sex={"Sex"} header={true} />
                </div>
                <div id="students-scroll-view">
                    {
                        studentList.map((stu) => {
                            return (
                                <div onClick={() => {
                                    navigate("/students/" + stu.id)
                                }}>
                                    <ScrollOption key={stu.id} name={stu.name} class={stu.class} fees={stu.fees} discount={stu.discount} sex={stu.sex} header={false}/>
                                </div>
                            );
                        })
                    }
                </div>
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

    if (props.header) {
        return (
            <div id="ScrollOption-header">
                <div id="scroll-name"><h3>{props.name}</h3></div>
                <div id="scroll-class"><h3>{props.class}</h3></div>
                <div id="scroll-fees"><h3>{props.fees}</h3></div>
                <div id="scroll-sex"><h3>{props.sex}</h3></div>
                <div id="scroll-discount"><h3>{props.discount}</h3></div>
            </div>
        )
    } else {
        return (
            <div id="ScrollOption">
                <div id="scroll-name"><p>{props.name}</p></div>
                <div id="scroll-class"><p>{props.class}</p></div>
                <div id="scroll-fees"><p>{props.fees}</p></div>
                <div id="scroll-sex"><p>{props.sex}</p></div>
                <div id="scroll-discount"><p>{props.discount}</p></div>
            </div>
        )
    }
}

export default StudentDisplay