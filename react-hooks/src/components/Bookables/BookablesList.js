import React, {useReducer, useEffect, useRef} from 'react';

import {FaArrowRight, FaSpinner} from 'react-icons/all';

import {days, sessions} from '../../static.json';
import reducer from './BookablesListRecucer';
import axios from "axios";

const initialState = {
    group: "Rooms",
    bookableIndex: 0,
    showDetails: false,
    bookables: [],
    isLoading: true,
    error: false
}

export default function BookablesList({state, dispatch}) {
    const {group, bookables, bookableIndex, isLoading, error} = state;

    const groups = [...new Set(bookables.map(bookable => bookable.group))]
    const bookablesInGroup = bookables.filter(bookable => bookable.group === group);

    const nextButtonRef = useRef();

    useEffect(() => {
        dispatch({
            type: 'FETCH_BOOKABLES_REQUEST'
        });
        axios.get("http://localhost:3001/bookables")
            .then(response => {
                dispatch({
                    type: 'FETCH_BOOKABLES_SUCCESS',
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: 'FETCH_BOOKABLES_ERROR',
                    payload: error
                });
            });
    }, []);

    if (error) {
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
                    onChange={e => dispatch({
                        type: "SET_GROUP",
                        payload: e.target.value
                    })}
                >
                    {groups.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>

                <ul className="bookables items-list-nav">
                    {bookablesInGroup
                        .map((bookable, index) =>(
                            <li key={bookable.id} className={index === bookableIndex ? "selected" : null}>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        dispatch({
                                            type: "SET_BOOKABLE",
                                            payload: index
                                        });
                                        nextButtonRef.current.focus();
                                    }}>
                                        {bookable.title}
                                </button>
                            </li>
                        ))
                    }
                </ul>

                <p>
                    <button
                            className="btn"
                            onClick={() => dispatch({
                                type: "NEXT_BOOKABLE"
                            })}
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