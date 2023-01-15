import "./PaymentsPage.css";
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { getDate, money } from '../../components/DetailView/DetailView';
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import BigBtn from "../../components/BigBtn/BigBtn";
import React, { useState, useEffect } from "react";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const PaymentsPage = () => {

	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [payments, setPayments] = useState([]);
	const [paymentList, setPaymentList] = useState([]);
	//const [searchText, setSearchText] = useState('');
	const [classnames, setClassnames] = useState([]);
	const [checkedClassrooms, setCheckedClassrooms] = useState([]);
	const [searchParams] = useSearchParams();
	const [classroom] = useState(searchParams.get('classroom'));

	useEffect(() => {
		const getPayments = (classes) => {
			let uri;
			if (classroom && new Set(classes).has(classroom.replace(new RegExp('_', 'g'), ' '))) {
				uri = `${BACKEND_HOST}/payments?schoolName=${localStorage.currentSchool}&classroom=${classroom}`
			} else {
				uri = `${BACKEND_HOST}/payments?schoolName=${localStorage.currentSchool}`
			}
			fetch(uri, {
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
		}

		fetch(`${BACKEND_HOST}/classrooms?schoolName=${localStorage.currentSchool}`, {
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
					getPayments(classList);
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

	/* const CurrentFilters = () => {
		/* ==== Check current filters in place ====
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
	} */

	const SearchPayment = (event) => {
		//setSearchText(event.target.value);
		
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
		if (classroom && new Set(classnames).has(classroom.replace(new RegExp('_', 'g'), ' '))) {
			return <div></div>
		}
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
				<div id="top-section">
					<div id="regstu" onClick={() => {
						navigate("/make-payment");
					}}>
						<BigBtn color="white" bcolor="rgb(60, 7, 60)" text="Make Payment"/>
					</div>
					<div id="login-signup-msg">
						<h5 id="err-msg"></h5>
					</div>
					<div id="students-con-header">
						<PaymentOption depositorName={"Depositor name"} studentName={"Student name"} amount={"Amount"} purpose={"Purpose"} createdAt={"Date"} header={true} />
					</div>
				</div>
				<div id="students-scroll-view">
					<div id="bottom-section">
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
		</div>
	)
}
			
	export default PaymentsPage;
