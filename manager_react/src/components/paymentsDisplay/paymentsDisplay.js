import React, { useState } from "react";
import "./paymentsDisplay.css";
import { useNavigate } from "react-router-dom";
import BigBtn from "../bigBtn/bigBtn";
import { ScrollOption } from "../studentsDisplay/studentsDisplay";


const PaymentsDisplay = () => {
    const payments = [];
    for (let i = 0; i < 256; i++) {
       payments.push({dep_name: "Opeyemi Ogunbode", ben_name: "Toluwalase Ogunbode", amount: "35,000", date: "06/08/2022", purpose: "School Fees", id: i, key: i + 'ope'});
    }
    const [paymentList, setPaymentList] = useState(payments);
    const [searchText, setSearchText] = useState('');
    const classnames = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'];
    const [checkedClassrooms, setCheckedClassrooms] = useState(new Array(classnames.length).fill(false));
    const navigate = useNavigate()

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
                return (payment.dep_name.toLowerCase().includes(event.target.value));
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
                    return (payment.class === classnames[i]);
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

    return (
        <div id="students-view-con">
            <div id="filters-con">
                <div id="filter-title"><h3>Filter by...</h3></div>
                <ClassFilter />
                <div id="search-filter">
                    <div className="filter-option"><p>Search payments</p></div>
                    <input id="stu-search-box" type="text" className="filter-input" onChange={SearchPayment} placeholder="Benefactor name"></input>
                </div>
            </div>
            <div id="students-con">
                <div id="regstu" onClick={() => {
                    navigate("/make-payment");
                }}>
                    <BigBtn color="white" bcolor="rgb(60, 7, 60)" text="Make Payment"/>
                </div>
                <div id="students-con-header">
                    <ScrollOption name={"Depositor name"} class={"Benefactor"} fees={"Amount"} discount={"Date"} sex={"Purpose"} header={true} />
                </div>
                <div id="students-scroll-view">
                    {
                        paymentList.map((payment) => {
                            return (
                                <div onClick={() => {
                                    navigate("/payments/" + payment.id)
                                }}>
                                    <ScrollOption name={payment.dep_name} class={payment.ben_name} fees={payment.amount} discount={payment.date} sex={payment.purpose} header={false} key={payment.key}/>
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