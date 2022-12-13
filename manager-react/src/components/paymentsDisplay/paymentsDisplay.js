import React, { useState, useEffect } from "react";
import "./paymentsDisplay.css";
import { useNavigate } from "react-router-dom";
import BigBtn from "../bigBtn/bigBtn";
import { Loader } from "../Loader/Loader";

export const getDate = (dateString, fulldate=false) => {

    // Get year, month, and day part from the date
    const date = new Date(dateString);
    if (!fulldate) {
        const year = date.toLocaleString("default", { year: "numeric" });
        const month = date.toLocaleString("default", { month: "2-digit" });
        const day = date.toLocaleString("default", { day: "2-digit" });
        // Generate yyyy-mm-dd date string
        const formattedDate = day + "-" + month + "-" + year;
        return formattedDate;
    } else {
        // Generate full date string
        return date.toUTCString();
    }
}

export const money = (amount) => {
    const amountStr = String(amount)
    let i = amountStr.length - 1;
    let j = 1;
    let cash = '';
    while (i > -1) {
        cash = amountStr[i] + cash;
        if (i && j % 3 === 0) {
            cash = ',' + cash;
        }
        i--;
        j++;
    }
    return cash;
}

const PaymentsDisplay = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [payments, setPayments] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [classnames, setClassnames] = useState([]);
    const [checkedClassrooms, setCheckedClassrooms] = useState([]);

    const alertMessage = (message, display, color) => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }

    useEffect(() => {
        fetch(`http://localhost:5002/api/v1/payments?schoolName=${localStorage.currentSchool}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
        })
        .then((response) => {
          if (response.ok) {
              response.json().then((data) => {
                setPayments(data.success);
                setPaymentList(data.success)
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

    const CurrentFilters = () => {
        /* ==== Check current filters in place ==== */
        let i = 0;
        let classEmpty = true;
        let updatedPaymentList = [];
        let currentPayments = [];
        for (const state of checkedClassrooms) {
            if (state) {
                classEmpty = false;
                let temp = ((payments.filter((stu) => {
                    return (stu.class === classnames[i]);
                })))
                updatedPaymentList = updatedPaymentList.concat(temp);
            }
            i++;
        }
        if (classEmpty) {
            currentPayments = payments;
        }
        currentPayments = currentPayments.concat(updatedPaymentList);
        return currentPayments;
    }

    const SearchPayment = (event) => {
        setSearchText(event.target.value);

        // Reset checkboxes
        const resetClass = new Array(classnames.length).fill(false);
        setCheckedClassrooms(resetClass);
        if (event.target.value.length > 0) {
            const currentPayments = payments.filter((payment) => {
                return (payment.studentName.toLowerCase().includes(event.target.value.toLowerCase()));
            })
            setPaymentList(currentPayments);
        }
        else {
            setPaymentList(payments);
        }
    }

    const FilterClass = (position) => {
        /* ==== Filter based on classrooms ==== */
        /* Resetting other filters */

        /* Done resetting! */
        let updatedClassState = checkedClassrooms;
        updatedClassState = checkedClassrooms.map((cls, index) => {
            return (index === position ? !cls : cls);
        });
        setCheckedClassrooms(updatedClassState);

        // Update the payments
        let updatedPaymentList = [];
        let classEmpty = true;
        let i = 0;
        for (const state of updatedClassState) {
            if (state) {
                classEmpty = false;
                let temp = ((payments.filter((payment) => {
                    return (payment.studentClass === classnames[i]);
                })))
                updatedPaymentList = updatedPaymentList.concat(temp);
            }
            i++;
        }
        if (classEmpty) {
            setPaymentList(payments);
        } else {
            setPaymentList(updatedPaymentList);
        }
        /* ==== Done updating list based on classrooms ==== */
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

    const PaymentOption = (props) => {
        return (
            <div id={props.header ? "ScrollOption-header" : "ScrollOption"}>
                <div className={props.header ? "pay-header" : "pay-col"} id="scroll-studentName"><h5>{props.studentName}</h5></div>
                <div className={props.header ? "pay-header" : "pay-col"} id="scroll-depositorName"><h5>{props.depositorName}</h5></div>
                <div className={props.header ? "pay-header" : "pay-col"} id="scroll-amount"><h5>{props.amount}</h5></div>
                <div className={props.header ? "pay-header" : "pay-col"} id="scroll-purpose"><h5>{props.purpose}</h5></div>
                <div className={props.header ? "pay-header" : "pay-col"} id="scroll-date"><h5>{props.createdAt}</h5></div>
            </div>
        )
    }

    return (
        <div id="students-view-con">
            <div id="filters-con">
                <div id="filter-title"><h3>Filter by...</h3></div>
                <ClassFilterComponent />
                <div id="search-filter">
                    <div className="filter-option"><p>Search payments</p></div>
                    <input id="pay-search-box" type="text" className="filter-input" onChange={SearchPayment} placeholder="Student name"></input>
                </div>
            </div>
            <div id="students-con">
                <div id="regstu" onClick={() => {
                    navigate("/make-payment");
                }}>
                    <BigBtn color="white" bcolor="rgb(60, 7, 60)" text="Make Payment"/>
                </div>
                <div id="students-con-header">
                    <PaymentOption depositorName={"Depositor name"} studentName={"Student name"} amount={"Amount"} purpose={"Purpose"} createdAt={"Date"} header={true} />
                </div>
                <div id="login-signup-msg">
                    <h5 id="err-msg"></h5>
                </div>
                <div id="students-scroll-view">
                    {
                        isLoading
                        ?
                        <Loader loadingText={'Loading...'} />
                        :
                        paymentList.map((payment) => {
                            return (
                                <div key={payment._id} onClick={() => {
                                    navigate("/payments/" + payment._id)
                                }}>
                                    <PaymentOption depositorName={payment.depositorName} studentName={payment.studentName} amount={`NGN ${money(payment.amount)}`} purpose={payment.purpose} createdAt={getDate(payment.createdAt)} header={false} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PaymentsDisplay;