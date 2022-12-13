import React, { useEffect } from 'react'
import { useState } from 'react'
import './searchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import PaneOption from '../paneOption/paneOption'
import { Loader } from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'


const SearchBar = (props) => {
    //Searchbar component

    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [inputValue, setinputValue] = useState("")
    const [presentItems, setPresentItems] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            if (items.length === 0) {
                fetch(`http://localhost:5002/api/v1/objects?schoolName=${localStorage.currentSchool}`, {
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
                            setItems(
                                [
                                    { name: 'Schools', path: '/schools', bold: true },
                                    { name: 'Classrooms', path: '/classrooms', bold: true },
                                    { name: 'Students ', path: '/students', bold: true },
                                    { name: 'Payments', path: '/payments', bold: true },
                                    ...data.success,
                                ]
                            );
                        }, 1000);
                    });
                } else if(response.status === 401) {
                    navigate('/login');
                }
                })
                .catch((err) => {
                    console.log(err.message)
                });
            }
        }, 1000)
    }, [inputValue])

    const handleChange = (event) => {
        setinputValue(event.target.value);
        const searchItems = document.getElementById("search-items")
        searchItems.style.display = "flex"
        if (event.target.value.length > 0) {
            setPresentItems(
                items.filter((item) => {
                    if (item) {
                        return (
                            item.name.toLowerCase().includes(event.target.value)
                        )
                    }
                })
            )
        } else {
            setPresentItems([]);
        }
    }

    /*inputValue.length > 0
    ?
    setPresentItems(
        items.filter((item) => {
            if (item.name) {
                return (
                    item.name.toLowerCase().includes(inputValue)
                )
            }
        })
    )
    :
    setPresentItems([]);*/

    const ClearSearch = () => {
        setinputValue("")
        setPresentItems([]);
    }

    /*if (containsText) {
        presentItems = items.filter((item) => {
            return (
                item.name.toLowerCase().includes(inputValue)
            )
        })
    }*/

    return (
        <div id="search">
            <div id="search-container">
                <div id="search-box">
                    <input id="searchbar-input" type="text" placeholder='Search' value={inputValue} onChange={handleChange} />
                    <div id="clear-search" onClick={ClearSearch}>
                        { inputValue && <FontAwesomeIcon icon={faXmarkCircle} color="gray" /> }
                    </div>
                </div>
                <div id="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="whitesmoke" />
                </div>
            </div>
            <div id="search-items">
                {
                    items.length > 0
                    ?
                    presentItems.map((item) => {
                        return (
                            <div key={item.path} onClick={() => {
                                navigate(item.path);
                            }}>
                                {
                                    item.bold
                                    ?
                                    <PaneOption key={item.path} name={item.name} bold={true} color={'rgb(60, 7, 60)'} />
                                    :
                                    <PaneOption key={item.path} name={item.name} />
                                }
                            </div>
                        )
                    })
                    :
                    <Loader loadingText={''} />
                }
            </div>
        </div>
    )
}

export default SearchBar