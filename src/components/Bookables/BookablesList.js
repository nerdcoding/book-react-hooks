import React, {useState, useEffect, useRef} from 'react';

import {FaArrowRight, FaSpinner} from 'react-icons/all';

import axios from "axios";


export default function BookablesList({selectedBookable, setSelectedBookable}) {
    // 1. Variables
    const [bookables, setBookables] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const group = selectedBookable?.group;
    const groups = [...new Set(bookables.map(bookable => bookable.group))]
    const bookablesInGroup = bookables.filter(bookable => bookable.group === group);

    const nextButtonRef = useRef();

    // 2. Effects
    useEffect(() => {
        console.log("****** EFFECT!!!!!!!");
        axios.get("http://localhost:3001/bookables")
            .then(response => {
                setSelectedBookable(response.data[0]);
                setBookables(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, [setSelectedBookable]);


    // 3. Handlers
    function changeGroup(event) {
        setSelectedBookable(bookables
            .find(bookable => bookable.group === event.target.value));
    }

    function changeBookable(newBookable) {
        setSelectedBookable(newBookable);
        nextButtonRef.current.focus();
    }

    function nextBookable() {
        const bookableIndex = bookablesInGroup.indexOf(selectedBookable);
        const nextIndex = (bookableIndex+1) % bookablesInGroup.length;
        setSelectedBookable(bookablesInGroup[nextIndex]);
    }

    // 4. UI
    if (error !== null) {
        return <p>{error.message}</p>
    }
    if (isLoading) {
        return <p><FaSpinner className="icon-loading" /> Loading bookables... </p>
    }

    return (
        <>
            <div>
                <select
                    value={group}
                    onChange={changeGroup}
                >
                    {groups.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>

                <ul className="bookables items-list-nav">
                    {bookablesInGroup
                        .map((bookable, index) =>(
                            <li key={bookable.id}
                                className={bookable.id === selectedBookable.id ? "selected" : null}>
                                <button
                                    className="btn"
                                    onClick={() => changeBookable(bookable)}>
                                        {bookable.title}
                                </button>
                            </li>
                        ))
                    }
                </ul>

                <p>
                    <button
                            className="btn"
                            onClick={nextBookable}
                            ref={nextButtonRef}
                            autoFocus>
                        <FaArrowRight />
                        <span>next</span>
                    </button>
                </p>
            </div>
        </>
    );
}